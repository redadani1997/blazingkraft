import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

function renderTitle() {
    return (
        <div className="flex w-full items-center justify-between">
            <CommonTitleLabel label="Alerts Rules" />
        </div>
    );
}

function AllAlertsHeaderComponent() {
    const title = renderTitle();
    return (
        <CommonTitle
            breadCrumbItems={[
                {
                    highlighted: true,
                    label: 'Management',
                },
                {
                    highlighted: true,
                    label: 'Alerts',
                },
            ]}
            title={title}
        />
    );
}

export default AllAlertsHeaderComponent;
