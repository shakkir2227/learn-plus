
type PasswordError = {
    oldPasswordError: null | string,
    newPasswordError: null | string,
}

export const validatePasswords = (oldPassword: string, newPassword: string,
    setOldPasswordError: React.Dispatch<React.SetStateAction<string>>,
    setNewPasswordError: React.Dispatch<React.SetStateAction<string>>
) => {
    let passwordErrors: PasswordError = { oldPasswordError: null, newPasswordError: null }

    if ((!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,30}$/.test(oldPassword))) {
        setOldPasswordError("Password needs: 1 lowercase, 1 uppercase, 1 digit, 8-30 characters.")
        passwordErrors = { ...passwordErrors, oldPasswordError: "Password needs: 1 lowercase, 1 uppercase, 1 digit, 8-30 characters." }
    }
    if ((!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,30}$/.test(newPassword))) {
        setNewPasswordError("Password needs: 1 lowercase, 1 uppercase, 1 digit, 8-30 characters.")
        passwordErrors = { ...passwordErrors, newPasswordError: "Password needs: 1 lowercase, 1 uppercase, 1 digit, 8-30 characters." }
    }

    const { oldPasswordError, newPasswordError } = passwordErrors
    if (oldPasswordError || newPasswordError) return false
    return true
}