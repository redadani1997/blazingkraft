import { useEffect, useMemo, useState } from 'react';

function useEditUserPasswordWithoutCurrent() {
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [passwordRequirements, setPasswordRequirements] = useState(new Map());

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

    const isPasswordValid = useMemo(() => {
        let valid = true;
        passwordRequirements.forEach(requirement => {
            if (!requirement.meets) {
                valid = false;
            }
        });
        return valid;
    }, [passwordRequirements]);

    return {
        password,
        setPassword,
        passwordConfirm,
        setPasswordConfirm,
        passwordRequirements,
        isPasswordValid,
    };
}

export default useEditUserPasswordWithoutCurrent;
