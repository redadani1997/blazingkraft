import { useEffect, useMemo, useState } from 'react';

function useCreateUser() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [groupCode, setGroupCode] = useState(null);

    const [emailRequirements, setEmailRequirements] = useState(new Map());
    const [passwordRequirements, setPasswordRequirements] = useState(new Map());
    const [firstNameRequirements, setFisrtNameRequirements] = useState(
        new Map(),
    );
    const [lastNameRequirements, setLastNameRequirements] = useState(new Map());

    useEffect(() => {
        const regex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const requirements = new Map();
        requirements.set('email', {
            meets: email.length > 0,
            label: 'Email is required',
        });
        requirements.set('emailFormat', {
            meets: String(email).toLowerCase().match(regex),
            label: 'Email must be valid',
        });
        setEmailRequirements(requirements);
    }, [email]);

    useEffect(() => {
        const requirements = new Map();
        requirements.set('password', {
            meets: password.length > 0,
            label: 'Password is required',
        });
        requirements.set('passwordLength', {
            meets: password.length >= 8,
            label: 'At least 8 characters',
        });
        requirements.set('passwordNumber', {
            meets: /[0-9]/.test(password),
            label: 'At least 1 number',
        });
        requirements.set('passwordConfirm', {
            meets: password === passwordConfirm,
            label: 'Passwords must match',
        });
        setPasswordRequirements(requirements);
    }, [password, passwordConfirm]);

    useEffect(() => {
        const requirements = new Map();
        requirements.set('firstName', {
            meets: firstName.length > 0,
            label: 'First name is required',
        });
        setFisrtNameRequirements(requirements);
    }, [firstName]);

    useEffect(() => {
        const requirements = new Map();
        requirements.set('lastName', {
            meets: lastName.length > 0,
            label: 'Last name is required',
        });
        setLastNameRequirements(requirements);
    }, [lastName]);

    const isEmailValid = useMemo(() => {
        let valid = true;
        emailRequirements.forEach(requirement => {
            if (!requirement.meets) {
                valid = false;
            }
        });
        return valid;
    }, [emailRequirements]);

    const isPasswordValid = useMemo(() => {
        let valid = true;
        passwordRequirements.forEach(requirement => {
            if (!requirement.meets) {
                valid = false;
            }
        });
        return valid;
    }, [passwordRequirements]);

    const isFirstNameValid = useMemo(() => {
        let valid = true;
        firstNameRequirements.forEach(requirement => {
            if (!requirement.meets) {
                valid = false;
            }
        });
        return valid;
    }, [firstNameRequirements]);

    const isLastNameValid = useMemo(() => {
        let valid = true;
        lastNameRequirements.forEach(requirement => {
            if (!requirement.meets) {
                valid = false;
            }
        });
        return valid;
    }, [lastNameRequirements]);

    return {
        email,
        setEmail,
        password,
        setPassword,
        passwordConfirm,
        setPasswordConfirm,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        groupCode,
        setGroupCode,
        emailRequirements,
        passwordRequirements,
        firstNameRequirements,
        lastNameRequirements,
        isEmailValid,
        isPasswordValid,
        isFirstNameValid,
        isLastNameValid,
    };
}

export default useCreateUser;
