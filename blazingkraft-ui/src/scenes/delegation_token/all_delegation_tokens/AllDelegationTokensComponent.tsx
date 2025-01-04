import { DelegationToken } from 'common/types/delegation_token';
import { useState } from 'react';
import CommonBody from 'scenes/common/body/CommonBody';
import DelegationTokenDetails from '../delegation_token_details/DelegationTokenDetails';
import ExpireDelegationToken from '../expire_delegation_token/ExpireDelegationToken';
import RenewDelegationToken from '../renew_delegation_token/RenewDelegationToken';
import AllDelegationTokensBody from './body/AllDelegationTokensBody';
import AllDelegationTokensHeader from './header/AllDelegationTokensHeader';

interface AllDelegationTokensComponentProps {
    refreshPageContent: () => void;
}

function AllDelegationTokensComponent({
    refreshPageContent,
}: AllDelegationTokensComponentProps) {
    const [
        isRenewDelegationTokenModalOpen,
        setIsRenewDelegationTokenModalOpen,
    ] = useState(false);
    const [delegationTokenToRenew, setDelegationTokenToRenew] =
        useState<string>();
    const [
        isExpireDelegationTokenModalOpen,
        setIsExpireDelegationTokenModalOpen,
    ] = useState(false);
    const [delegationTokenToExpire, setDelegationTokenToExpire] =
        useState<string>();
    const [
        isDelegationTokenDetailsModalOpen,
        setIsDelegationTokenDetailsModalOpen,
    ] = useState(false);
    const [delegationTokenDetails, setDelegationTokenDetails] =
        useState<DelegationToken>(null);
    return (
        <>
            <AllDelegationTokensHeader
                refreshPageContent={refreshPageContent}
                setIsExpireDelegationTokenModalOpen={
                    setIsExpireDelegationTokenModalOpen
                }
                setIsRenewDelegationTokenModalOpen={
                    setIsRenewDelegationTokenModalOpen
                }
                setDelegationTokenToExpire={setDelegationTokenToExpire}
                setDelegationTokenToRenew={setDelegationTokenToRenew}
            />
            <CommonBody>
                <AllDelegationTokensBody
                    setIsRenewDelegationTokenModalOpen={
                        setIsRenewDelegationTokenModalOpen
                    }
                    setIsExpireDelegationTokenModalOpen={
                        setIsExpireDelegationTokenModalOpen
                    }
                    setIsDelegationTokenDetailsModalOpen={
                        setIsDelegationTokenDetailsModalOpen
                    }
                    setDelegationTokenDetails={setDelegationTokenDetails}
                    setDelegationTokenToExpire={setDelegationTokenToExpire}
                    setDelegationTokenToRenew={setDelegationTokenToRenew}
                />
            </CommonBody>
            <DelegationTokenDetails
                isModalOpen={isDelegationTokenDetailsModalOpen}
                setIsModalOpen={setIsDelegationTokenDetailsModalOpen}
                delegationToken={delegationTokenDetails}
            />
            <ExpireDelegationToken
                isModalOpen={isExpireDelegationTokenModalOpen}
                setIsModalOpen={setIsExpireDelegationTokenModalOpen}
                delegationTokenToExpire={delegationTokenToExpire}
                refreshPageContent={refreshPageContent}
            />
            <RenewDelegationToken
                isModalOpen={isRenewDelegationTokenModalOpen}
                setIsModalOpen={setIsRenewDelegationTokenModalOpen}
                delegationTokenToRenew={delegationTokenToRenew}
                refreshPageContent={refreshPageContent}
            />
        </>
    );
}

export default AllDelegationTokensComponent;
