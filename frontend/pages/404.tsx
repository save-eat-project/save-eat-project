import { NotFoundIcon } from "@/components/icon";
import { PageLayout } from "@/components/layout";

function NotFoundContent() {
    return <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }}>
        <NotFoundIcon height={200} width={200}/>
    </div>
    
}

export default function NotFoundPage() {
    return <PageLayout
        content={<NotFoundContent />}
    />
}