import { UserDetails } from 'common/types/user';
import { useEffect, useMemo, useState } from 'react';

interface UseEditUserProps {
    userDetails: UserDetails;
}

function useEditUser({ userDetails }: UseEditUserProps) {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [groupCode, setGroupCode] = useState(null);

    const [emailRequirements, setEmailRequirements] = useState(new Map());
    const [firstNameRequirements, setFisrtNameRequirements] = useState(
        new Map(),
    );
    const [lastNameRequirements, setLastNameRequirements] = useState(new Map());

    useEffect(() => {
        if (userDetails) {
            setEmail(userDetails.email);
            setFirstName(userDetails.firstName);
            setLastName(userDetails.lastName);
            setGroupCode(userDetails.groupCode);
        }
    }, [userDetails]);

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
        firstName,
        setFirstName,
        lastName,
        setLastName,
        groupCode,
        setGroupCode,
        emailRequirements,
        firstNameRequirements,
        lastNameRequirements,
        isEmailValid,
        isFirstNameValid,
        isLastNameValid,
    };
}

export default useEditUser;
