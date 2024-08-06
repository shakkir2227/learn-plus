import React, { CSSProperties, forwardRef, useEffect, useRef, useState } from 'react'
import { Separator } from '../../components/ui/separator'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ACCEPTED_IMAGE_TYPES, LEARNER_ROUTE_PATHS, MAX_FILE_SIZE, MAX_IMAGE_SIZE, ROUTE_PATHS, sizeInMB } from '../../constants'
import { Button } from '../../components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import Profile from './Profile'
import Header from '../../components/instructor/Header'
import { Textarea } from '../../components/ui/textarea'
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { useDropzone } from "react-dropzone";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../components/ui/form"
import { Check, ChevronsUpDown, ImagePlus, Upload, X } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover'
import { cn } from "../../lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../../components/ui/command'
import { languages } from '../../constants'
import { validateImageFile } from '../../utils/imageValidation'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog'
import { createCourseService, getAllSubjectsService, Subject, updateCourseService } from '../../services/instructor/CourseService'
import HashLoader from 'react-spinners/HashLoader'
import toast, { Toaster } from 'react-hot-toast'
import ToastError from '../../components/shared/ToastError'
import ToastSuccess from '../../components/shared/ToastSuccess'
import { getCourseDetailsService } from '../../services/learner/CourseService'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../../components/ui/alert-dialog'


const formSchema = z.object({
    name: z.string()
        .min(3, { message: "Course name must be at least 3 characters long." })
        .max(50, { message: "Course name cannot exceed 50 characters." })
        .regex(/^[a-zA-Z0-9\s\-']+$/, { message: "Course name contains invalid characters." }),

    description: z.string()
        .min(10, { message: "Course description must be at least 10 characters long." })
        .max(1000, { message: "Course description cannot exceed 1000 characters." })
        .regex(/^[a-zA-Z0-9\s.,;!?'-]*$/, { message: "Course description contains invalid characters." }),

    subject: z.string({
        required_error: "Please select a subject.",
    }),
    language: z.string({
        required_error: "Please select a language.",
    }),
    objectives: z.array(
        z.string()
            .min(3, { message: "At least 3 characters long." })
            .max(100, { message: "Cannot exceed 100 characters." })
            .regex(/^[a-zA-Z0-9\s\-']+$/, { message: "Contains invalid characters." }),

    ),
    thumbnail: z.union([
        z.string(),
        z.instanceof(File),
    ])
})

type Lesson = {
    _id: string,
    name: string,
    content: File | string,
    order_index: number
}

const override: CSSProperties = {
    display: "block",
    marginLeft: "170px",
    borderColor: "red",
    width: "20px"
};


const UpdateCourse = () => {
    const [preview, setPreview] = React.useState<string | ArrayBuffer | null>("");
    const [lessons, setLessons] = useState<Lesson[]>([])
    const [lessonsInput, setLessonsInput] = useState<Lesson[]>([])
    const [lessonTitleError, setLessonTitleError] = useState<string>("")
    const [lessonContentError, setLessonContentError] = useState<string>("")
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [subjects, setSubjects] = useState<Subject[]>()
    const { courseId } = useParams()
    const [openPopoverIndex, setOpenPopoverIndex] = useState<null | number>(null);
    const [loading, setsLoading] = useState(true)
    
    useEffect(() => {
        (async () => {
            if (!courseId) return
            const response = await getCourseDetailsService(courseId)
            // TODO: Handle course not avaialbe error

            if (response.success && response.data) {
                const { _id, name, description, courseSubject, courseLanguage, thumbnail, objectives } = response.data?.courseDetails
                form.setValue("name", name)
                form.setValue("description", description)
                form.setValue("subject", courseSubject.name)
                form.setValue("language", courseLanguage.name)
                form.setValue("objectives", objectives)
                form.setValue("thumbnail", thumbnail)
                setPreview(thumbnail)

                const { lessons } = response.data
                setLessonsInput(lessons)
            }
        })()
    }, [loading])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            objectives: [" ", " ", " "],
        },
    })

    const { fields, append } = useFieldArray({
        name: "objectives",
        control: form.control,
    })

    const onDrop = React.useCallback(
        (acceptedFiles: File[]) => {
            const reader = new FileReader();
            try {
                reader.onload = () => setPreview(reader.result);
                reader.readAsDataURL(acceptedFiles[0]);
                form.setValue("thumbnail", acceptedFiles[0]);
                form.clearErrors("thumbnail");
            } catch (error) {
                setPreview(null);
                form.resetField("thumbnail");
            }
        },
        [form],
    );

    const { getRootProps, getInputProps, isDragActive, fileRejections } =
        useDropzone({
            onDrop,
            maxFiles: 1,
            maxSize: 1000000,
            accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
        });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)

        const formData = new FormData();
        const { name, description, language, objectives, subject } = values
        formData.append('basicDetails', JSON.stringify({ name, description, language, objectives, subject }));

        if (values.thumbnail instanceof Blob) {
            formData.append('thumbnail', values.thumbnail);
        }

        lessonsInput.forEach((lesson, index) => {
            if (lesson.content instanceof Blob) {
                formData.append(`lessons[${index}][content]`, lesson.content)
            }

            formData.append(`lessons[${index}][title]`, lesson.name);
        })

        const response = await updateCourseService(formData, courseId as string)
        if (!response.success && response.message) {
            toast.custom((t) => (
                <ToastError t={t} message={response.message as string} />
            ), {
                duration: 2000, // Auto dismiss after 2 seconds
            });
        }

        if (response.success && response.message) {
            form.reset()
            setPreview(null)
            setLessonsInput([])
            
            setsLoading(false)
            return toast.custom((t) => (
                <ToastSuccess message={response.message as string} t={t} />
            ), {
                duration: 2000, // Auto dismiss after 2 seconds
            })
        }

    }

    const addLesson = () => {
        setLessonTitleError("")
        setLessonContentError("")

        if (lessons[lessons.length - 1]?.name !== "") {
            setLessons([...lessons, {
                _id: "", name: "", content: new File([""], "filename"),
                order_index: lessonsInput.length + 1
            }])
        }
    }

    const updateLessonTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLessons(lessons.map((lesson) => {
            if (lesson.order_index !== lessonsInput.length + 1) return lesson
            else return { ...lesson, name: e.target.value }

        }))
    }

    const updateLessonContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files?.[0]
        if (!file) return
        setLessons(lessons.map((lesson) => {
            if (lesson.order_index !== lessonsInput.length + 1) return lesson
            else return { ...lesson, content: file }
        }))
    }

    const updateLesson = () => {

        setLessonTitleError("")
        setLessonContentError("")
        const { name: title, content } = lessons[lessons.length - 1]
        if (!title) {
            setLessonTitleError("Title is required.")
            return
        }
        if (!/^[a-zA-Z0-9\s]{3,50}$/.test(title)) {
            setLessonTitleError("Title: 3-50 chars, letters, numbers, and spaces only")
            return
        }
        if (!content) {
            setLessonContentError("Content is required.")
            return
        }

        const allowedExtensions = ['mp4', 'avi', 'mkv', 'mov', 'wmv'];
        const maxSize = 100 * 1024 * 1024; // 100 MB

        if (typeof (content) === "string") return

        const fileName = content.name;
        const fileSize = content.size;
        const fileExtension = fileName?.split('.').pop().toLowerCase();

        if (!allowedExtensions.includes(fileExtension)) {
            setLessonContentError("Invalid file type. Only video files are allowed.")
            return
        }

        if (fileSize > maxSize) {
            setLessonContentError("File size exceeds 100 MB.")
            return
        }

        setLessonsInput([...lessonsInput, {
            order_index: lessonsInput.length + 1,
            name: title,
            _id: "",
            content

        }])

        setIsDialogOpen(false);
    }

    const removeLessonInput = () => {
        lessonsInput.pop()
        setLessonsInput([...lessonsInput])
    }

    useEffect(() => {
        (async () => {
            const response = await getAllSubjectsService()
            if (response && response.success) {
                setSubjects(response.data?.allSubjects)
            }
        })()

    }, [])

    const removeLessonContent = (order_index: number) => {
        setLessonsInput(lessonsInput.map((lesson) => {
            if (lesson.order_index === order_index) {
                return { ...lesson, content: new File([""], "filename") }
            } else {
                return lesson
            }
        }))
    }

    const updateExistingLesson = (order_index: number) => {
        setLessonTitleError("")
        setLessonContentError("")

        const lesson = lessonsInput.find((lesson) => (lesson.order_index === order_index))
        if (!lesson) return

        const { name: title, content } = lesson

        if (!title) {
            setLessonTitleError("Title is required.")
            return
        }
        if (!/^[a-zA-Z0-9\s]{3,50}$/.test(title)) {
            setLessonTitleError("Title: 3-50 chars, letters, numbers, and spaces only")
            return
        }
        if (!content || content?.name === "filename") {
            setLessonContentError("Content is required.")
            return
        }

        const allowedExtensions = ['mp4', 'avi', 'mkv', 'mov', 'wmv'];
        const maxSize = 100 * 1024 * 1024; // 100 MB

        if (lesson.content instanceof Blob) {

            const fileName = content.name;
            const fileSize = content.size;
            const fileExtension = fileName?.split('.').pop().toLowerCase();

            if (!allowedExtensions.includes(fileExtension)) {
                setLessonContentError("Invalid file type. Only video files are allowed.")
                return
            }

            if (fileSize > maxSize) {
                setLessonContentError("File size exceeds 100 MB.")
                return
            }
        }

        handleClosePopover()
    }

    const updateExistingLessonTitle = (e: React.ChangeEvent<HTMLInputElement>, order_index: number) => {
        setLessonsInput(lessonsInput.map((lesson) => {
            if (lesson.order_index !== order_index) return lesson
            else return { ...lesson, name: e.target.value }
        }))

    }

    const updateExistingLessonContent = (e: React.ChangeEvent<HTMLInputElement>, order_index: number) => {
        const file = e.target?.files?.[0]
        if (!file) return
        setLessonsInput(lessonsInput.map((lesson) => {
            if (lesson.order_index !== order_index) return lesson
            else return { ...lesson, content: file }
        }))
    }

    const handleOpenPopover = (index: number) => {
        setOpenPopoverIndex(index);
    };

    const handleClosePopover = () => {
        setOpenPopoverIndex(null);
    };

    return (
        <div>
            <Header iconColor='black' logoTheme='WHITE' />
            <hr className='mt-5'></hr>
            <div className="space-y-6 p-10 pb-16 w-11/12 mx-auto ">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight" >Update Course</h2>
                    <p className="text-muted-foreground">Enter the updated information for your course below to make changes to the existing course.</p>
                </div>
                <Separator className="my-6" />
                <div className='min-h-screen bg-muted rounded-md'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-5">
                            <div className='flex justify-around gap-2'>
                                <div className='w-8/12 flex flex-col gap-5'>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Basic Details</CardTitle>
                                        </CardHeader>
                                        <CardContent className='flex flex-col gap-3'>
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Name</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Ex: Organic Chemistry" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                        <FormDescription>
                                                        </FormDescription>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="description"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Description</FormLabel>
                                                        <FormControl>
                                                            <Textarea placeholder="Enter a brief overview of the course content and objectives to inform and engage potential learners." {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                        <FormDescription>
                                                        </FormDescription>
                                                    </FormItem>
                                                )}
                                            />

                                        </CardContent>
                                    </Card>

                                    <Card
                                        className="">
                                        <CardHeader>
                                            <CardTitle>Update Lesson</CardTitle>
                                            <CardDescription>
                                                Update lesson of your course to expand its content and structure.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>

                                            <div className="grid gap-2">
                                                <div className="grid grid-cols-3 gap-y-5">

                                                    {lessonsInput.map((lesson, index) => {
                                                        return (
                                                            <AlertDialog key={lesson.order_index} open={openPopoverIndex === lesson.order_index} onOpenChange={() => handleOpenPopover(lesson.order_index)}>
                                                                <AlertDialogTrigger asChild>
                                                                    <button className='w-full'>
                                                                        <div className='cursor-pointer'>
                                                                            <p className="relative flex flex-col text-sm text-center aspect-square w-3/4 items-center justify-center rounded-md border border-dashed bg-muted">
                                                                                {lesson.order_index === lessonsInput.length &&
                                                                                    <span className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200" onClick={removeLessonInput}>
                                                                                        <X className="h-4 w-4 text-muted-foreground" />
                                                                                        <span className="sr-only">Remove</span>
                                                                                    </span>
                                                                                }
                                                                                <span className="font-mono">{ }</span>
                                                                                <span className="font-serif">{`${lesson?.name}`}</span>
                                                                                {lesson.content instanceof Blob ?
                                                                                    <span className="text-xs font-serif w-3/4">{lesson?.content?.name}</span>
                                                                                    :
                                                                                    <span className="text-xs font-serif w-3/4">{""}</span>
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    </button>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <div className="grid gap-4">
                                                                        <div className="space-y-2">
                                                                            <h4 className="font-medium leading-none">Update lesson</h4>
                                                                            <p className="text-sm text-muted-foreground">
                                                                                Set the dimensions for the layer.
                                                                            </p>
                                                                        </div>
                                                                        <div className="grid gap-2">
                                                                            <div className="grid grid-cols-4 items-center gap-4 ">
                                                                                <Label htmlFor="width">Title</Label>
                                                                                <Input
                                                                                    id="width"
                                                                                    className="col-span-2 h-8"
                                                                                    value={lesson.name}
                                                                                    onChange={(e) => updateExistingLessonTitle(e, lesson.order_index)}
                                                                                />
                                                                            </div>
                                                                            <p className='text-red-500 text-center text-xs'>{lessonTitleError}</p>


                                                                            {typeof (lesson?.content) !== "string" ?
                                                                                <>
                                                                                    {lesson.content?.size ?

                                                                                        <div className="grid grid-cols-4 items-center gap-4 relative">
                                                                                            <Label htmlFor="width">Content</Label>
                                                                                            <Input
                                                                                                id="width"
                                                                                                className="col-span-2 h-8"
                                                                                                value={lesson.content.name}
                                                                                            />
                                                                                            <span className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200" onClick={() => removeLessonContent(lesson.order_index)}>
                                                                                                <X className="h-4 w-4 text-muted-foreground" />
                                                                                                <span className="sr-only">Remove</span>
                                                                                            </span>
                                                                                        </div>

                                                                                        :

                                                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                                                            <Label htmlFor="width">Content</Label>
                                                                                            <Input
                                                                                                type='file'
                                                                                                id="width"
                                                                                                className="col-span-2 h-8"
                                                                                                accept="video/mp4, video/avi, video/mkv, video/mov, video/wmv"
                                                                                                onChange={(e) => updateExistingLessonContent(e, lesson.order_index)}

                                                                                            />
                                                                                        </div>


                                                                                    }

                                                                                    <p className='text-red-500 text-center  text-xs'>{lessonContentError}</p>
                                                                                </>
                                                                                :
                                                                                <>

                                                                                    <div className="grid grid-cols-4 items-center gap-4 relative">
                                                                                        <Label htmlFor="width">Content</Label>
                                                                                        <Input
                                                                                            id="width"
                                                                                            className="col-span-2 h-8"
                                                                                            value={lesson.content}
                                                                                        />
                                                                                        <span className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200" onClick={() => removeLessonContent(lesson.order_index)}>
                                                                                            <X className="h-4 w-4 text-muted-foreground" />
                                                                                            <span className="sr-only">Remove</span>
                                                                                        </span>
                                                                                    </div>
                                                                                    <p className='text-red-500 text-center  text-xs'>{lessonContentError}</p>
                                                                                </>


                                                                            }

                                                                        </div>
                                                                        <Button onClick={() => updateExistingLesson(lesson.order_index)}>Update Lesson</Button>
                                                                    </div>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        )
                                                    })}


                                                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                                        <DialogTrigger asChild onClick={addLesson}>
                                                            <button className="flex aspect-square w-3/4 items-center justify-center rounded-md border border-dashed bg-muted">
                                                                <Upload className="h-4 w-4 text-muted-foreground" />
                                                                <span className="sr-only">Upload</span>
                                                            </button>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-[425px]">
                                                            <DialogHeader>
                                                                <DialogTitle>Insert Lesson</DialogTitle>
                                                                <DialogDescription>
                                                                    Click save when you're done.
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <div className="grid gap-4 py-4">
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <Label htmlFor="name" className="text-right">
                                                                        Title
                                                                    </Label>
                                                                    <Input
                                                                        id="title"
                                                                        className="col-span-3"
                                                                        value={lessons[lessons.length - 1]?.name}
                                                                        onChange={(e) => updateLessonTitle(e)}
                                                                    />
                                                                </div>
                                                                <p className='text-red-500 text-center my-[-10px] text-xs'>{lessonTitleError}</p>
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <Label htmlFor="vido" className="text-right">
                                                                        Content
                                                                    </Label>
                                                                    <Input
                                                                        id="content"
                                                                        type='file'
                                                                        accept="video/mp4, video/avi, video/mkv, video/mov, video/wmv"
                                                                        className="col-span-3"
                                                                        onChange={(e) => updateLessonContent(e)}
                                                                    />
                                                                </div>
                                                                <p className='text-red-500 text-center my-[-10px] text-xs'>{lessonContentError}</p>
                                                            </div>
                                                            <DialogFooter>
                                                                <Button onClick={updateLesson}>Save changes</Button>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>

                                                </div>
                                            </div>

                                        </CardContent>
                                    </Card>
                                </div>
                                <div className='w-4/12 flex flex-col gap-5'>
                                    <Card >
                                        <CardHeader>
                                            <CardTitle>Subject & Language</CardTitle>
                                        </CardHeader>
                                        <CardContent className='flex flex-col gap-4'>
                                            <FormField
                                                control={form.control}
                                                name="subject"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-col">
                                                        <FormLabel>Subjects</FormLabel>
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <FormControl>
                                                                    <Button
                                                                        variant="outline"
                                                                        role="combobox"
                                                                        className={cn(
                                                                            " justify-between",
                                                                            !field.value && "text-muted-foreground"
                                                                        )}
                                                                    >
                                                                        {field.value
                                                                            ? subjects?.find(
                                                                                (subject) => subject.name === field.value
                                                                            )?.name
                                                                            : "Select subject"}
                                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-[200px] p-0">
                                                                <Command>
                                                                    <CommandInput placeholder="Search subject..." />
                                                                    <CommandList>
                                                                        <CommandEmpty>No subject found.</CommandEmpty>
                                                                        <CommandGroup>
                                                                            {subjects?.map((subject) => (
                                                                                <CommandItem
                                                                                    value={subject.name}
                                                                                    key={subject.name}
                                                                                    onSelect={() => {
                                                                                        form.setValue("subject", subject.name)
                                                                                    }}
                                                                                >
                                                                                    <Check
                                                                                        className={cn(
                                                                                            "mr-2 h-4 w-4",
                                                                                            subject.name === field.value
                                                                                                ? "opacity-100"
                                                                                                : "opacity-0"
                                                                                        )}
                                                                                    />
                                                                                    {subject.name}
                                                                                </CommandItem>
                                                                            ))}
                                                                        </CommandGroup>
                                                                    </CommandList>
                                                                </Command>
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormDescription>

                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="language"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-col">
                                                        <FormLabel>Language</FormLabel>
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <FormControl>
                                                                    <Button
                                                                        variant="outline"
                                                                        role="combobox"
                                                                        className={cn(
                                                                            " justify-between",
                                                                            !field.value && "text-muted-foreground"
                                                                        )}
                                                                    >
                                                                        {field.value
                                                                            ? languages.find(
                                                                                (language) => language.value === field.value
                                                                            )?.label
                                                                            : "Select language"}
                                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-[200px] p-0">
                                                                <Command>
                                                                    <CommandInput placeholder="Search language..." />
                                                                    <CommandList>
                                                                        <CommandEmpty>No language found.</CommandEmpty>

                                                                        <CommandGroup>
                                                                            {languages.map((language) => (
                                                                                <CommandItem
                                                                                    value={language.label}
                                                                                    key={language.value}
                                                                                    onSelect={() => {
                                                                                        form.setValue("language", language.value)
                                                                                    }}
                                                                                >
                                                                                    <Check
                                                                                        className={cn(
                                                                                            "mr-2 h-4 w-4",
                                                                                            language.value === field.value
                                                                                                ? "opacity-100"
                                                                                                : "opacity-0"
                                                                                        )}
                                                                                    />
                                                                                    {language.label}
                                                                                </CommandItem>
                                                                            ))}
                                                                        </CommandGroup>
                                                                    </CommandList>
                                                                </Command>
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormDescription>
                                                            This is the default language of your course.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                        </CardContent>
                                    </Card>

                                    <Card >
                                        <CardHeader>
                                            <CardTitle>Thumbnail</CardTitle>
                                        </CardHeader>
                                        <CardContent className='flex flex-col gap-4'>
                                            <FormField
                                                control={form.control}
                                                name="thumbnail"
                                                render={() => (
                                                    <FormItem>
                                                        <FormLabel
                                                            className={`${fileRejections.length !== 0 && "text-destructive"
                                                                }`}><h2 className="text-xl font-semibold tracking-tight">

                                                                <span
                                                                    className={
                                                                        form.formState.errors.thumbnail || fileRejections.length !== 0
                                                                            ? "text-destructive"
                                                                            : "text-muted-foreground"
                                                                    }
                                                                ></span>
                                                            </h2></FormLabel>
                                                        <FormControl>
                                                            <div
                                                                {...getRootProps()}
                                                                className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border border-foreground p-8 shadow-sm shadow-foreground"
                                                            >
                                                                {preview && (
                                                                    <img
                                                                        src={preview as string}
                                                                        alt="Uploaded image"
                                                                        className="w-24 h-24 rounded-full object-cover"
                                                                    />
                                                                )}
                                                                <ImagePlus
                                                                    className={`size-10 ${preview ? "hidden" : "block"}`}
                                                                />
                                                                <Input {...getInputProps()} type="file" />
                                                                {isDragActive ? (
                                                                    <p>Drop the image!</p>
                                                                ) : (
                                                                    <p className='text-sm'>Click here to update.</p>
                                                                )}
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                        <FormDescription>
                                                        </FormDescription>
                                                    </FormItem>
                                                )}
                                            />
                                        </CardContent>
                                    </Card>

                                    <Card >
                                        <CardHeader>
                                            <CardTitle>Objectives</CardTitle>
                                        </CardHeader>
                                        <CardContent className='flex flex-col gap-4'>
                                            {fields.map((field, index) => (
                                                <FormField
                                                    control={form.control}
                                                    key={field.id}
                                                    name={`objectives.${index}`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Objectives ({`${index + 1}/3`})</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                            <FormDescription>
                                                            </FormDescription>
                                                        </FormItem>
                                                    )}
                                                />
                                            ))}
                                        </CardContent>
                                    </Card>

                                    {form.formState.isSubmitting ? <HashLoader
                                        loading={form.formState.isSubmitting}
                                        cssOverride={override}
                                        size={30}
                                        aria-label="Loading Spinner"
                                        data-testid="loader" /> :
                                        <Button disabled={form.formState.isSubmitting} type="submit">Update Course</Button>
                                    }
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
            <div><Toaster /></div>
        </div >
    )
}

export default UpdateCourse
