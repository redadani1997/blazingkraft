import { KafkaPrincipal } from 'common/types/delegation_token';
import { CommonValidationUtils } from './CommonValidationUtils';

function formatOwner(principal: KafkaPrincipal): string {
    if (!principal) {
        return 'No Owner';
    }
    if (!principal.principalType && principal.principalName) {
        return principal.principalName;
    }
    if (!principal.principalName && principal.principalType) {
        return principal.principalType;
    }
    if (!principal.principalType && !principal.principalName) {
        return 'No Owner';
    }

    return `${principal.principalType}:${principal.principalName}`;
}
function formatRequester(principal: KafkaPrincipal): string {
    if (!principal) {
        return 'No Requester';
    }
    if (!principal.principalType && principal.principalName) {
        return principal.principalName;
    }
    if (!principal.principalName && principal.principalType) {
        return principal.principalType;
    }
    if (!principal.principalType && !principal.principalName) {
        return 'No Requester';
    }

    return `${principal.principalType}:${principal.principalName}`;
}

function formatRenewers(renewers: KafkaPrincipal[]): string {
    if (CommonValidationUtils.isFalsyArray(renewers)) {
        return 'No Renewers';
    }
    return renewers.map(formatOwner).join(' , ');
}

const DelegationTokenUtils = {
    formatOwner,
    formatRequester,
    formatRenewers,
};

export { DelegationTokenUtils };
