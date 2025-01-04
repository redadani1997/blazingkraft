import CommonTitle from 'scenes/common/title/CommonTitle';
import CommonTitleLabel from 'scenes/common/title/CommonTitleLabel';

function renderTitle() {
    return <CommonTitleLabel label="User Creation" />;
}

function CreateUserHeaderComponent() {
    const title = renderTitle();
    return (
        <CommonTitle
            breadCrumbItems={[
                {
                    highlighted: true,
                    label: 'Management',
                },
                {
                    highlighted: false,
                    to: '/management/users',
                    label: 'Users',
                },
                {
                    highlighted: true,
                    label: 'Create',
                },
            ]}
            title={title}
        />
    );
}

export default CreateUserHeaderComponent;
