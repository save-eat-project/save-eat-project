import {EditorPage} from '../../components/Editor'
import {KakaoMap} from '../../components/map/kakaomap'

export default function WritePage() {    
    return <>
        <KakaoMap>
            <EditorPage />
        </KakaoMap>
    </>
}