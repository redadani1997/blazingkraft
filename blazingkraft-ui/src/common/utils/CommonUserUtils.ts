function computeDisplayedName(
    identifier,
    preferred_username,
    given_name,
    family_name,
    name,
) {
    if (preferred_username) {
        return preferred_username;
    }
    if (given_name && family_name) {
        return `${given_name} ${family_name}`;
    }
    if (given_name) {
        return given_name;
    }
    if (family_name) {
        return family_name;
    }
    if (name) {
        return name;
    }
    return identifier;
}

function computeIdentifier(
    email,
    mail,
    preferred_username,
    id,
    given_name,
    family_name,
    name,
) {
    return (
        email ||
        mail ||
        preferred_username ||
        id ||
        given_name ||
        family_name ||
        name ||
        null
    );
}

function currentUserFromProfile(profile) {
    if (!profile) {
        return {
            identifier: null,
            email: null,
            displayedName: null,
            mail: null,
            iss: null,
            preferredUsername: null,
            givenName: null,
            familyName: null,
            name: null,
            id: null,
            picture: null,
        };
    }
    const {
        email,
        mail,
        iss,
        preferred_username,
        given_name,
        family_name,
        name,
        id,
        picture,
    } = profile;

    const identifier = computeIdentifier(
        email,
        mail,
        preferred_username,
        id,
        given_name,
        family_name,
        name,
    );

    const displayedName = computeDisplayedName(
        identifier,
        preferred_username,
        given_name,
        family_name,
        name,
    );

    return {
        identifier,
        displayedName,
        email,
        mail,
        iss,
        preferredUsername: preferred_username,
        givenName: given_name,
        familyName: family_name,
        name,
        id,
        picture,
    };
}

const CommonUserUtils = {
    currentUserFromProfile,
};

export { CommonUserUtils };
