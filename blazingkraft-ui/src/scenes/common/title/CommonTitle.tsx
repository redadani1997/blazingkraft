import CommonBreadCrumbs, {
    CommonBreadCrumbItem,
} from '../breadcrumbs/CommonBreadCrumbs';
import './index.css';

interface CommonTitleProps {
    breadCrumbItems?: CommonBreadCrumbItem[];
    title?: React.ReactNode;
}

function CommonTitle({ breadCrumbItems, title }: CommonTitleProps) {
    return (
        <div className="common-title">
            {breadCrumbItems?.length > 0 && (
                <CommonBreadCrumbs items={breadCrumbItems} />
            )}
            {title}
        </div>
    );
}

export default CommonTitle;
