import React from 'react'
import Header from '../../components/admin/Header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import Dashboard from './Dashboard'
import UsersList from './UsersList'
import CoursesList from './CoursesList'

const Home = () => {
    return (
        <div className='bg-black min-h-screen'>
            <Header logoTheme='BLACK' iconColor='white' />
            <div>
                <h2 className="pt-5  text-4xl text-center font-bold tracking-tight text-white">Dashboard</h2>
                <Tabs defaultValue="overview" className="space-y-4 w-3/4 mx-auto" >
                    <div className='flex justify-center items-center p-10'>
                        <TabsList className='bg-gray-800 flex gap-7'>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger  value="users" >
                                Users
                            </TabsTrigger>
                            <TabsTrigger  value="courses" >
                                Courses
                            </TabsTrigger>
                            <TabsTrigger  value="subscriptions" >
                                Subscriptions
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="overview" className="space-y-4">
                        <Dashboard />
                    </TabsContent>
                    <TabsContent value="users" className="space-y-4">
                        <UsersList />
                    </TabsContent>
                    <TabsContent value="courses" className="space-y-4">
                        <CoursesList />
                    </TabsContent>

                </Tabs>
            </div>

        </div>
    )
}

export default Home
