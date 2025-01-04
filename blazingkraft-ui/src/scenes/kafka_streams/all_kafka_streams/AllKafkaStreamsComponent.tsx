import CommonBody from 'scenes/common/body/CommonBody';
import AllKafkaStreamsBody from './body/AllKafkaStreamsBody';
import AllKafkaStreamsHeader from './header/AllKafkaStreamsHeader';

function AllKafkaStreamsComponent() {
    return (
        <>
            <AllKafkaStreamsHeader />
            <CommonBody>
                <AllKafkaStreamsBody />
            </CommonBody>
        </>
    );
}

export default AllKafkaStreamsComponent;
