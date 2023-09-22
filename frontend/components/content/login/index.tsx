import { useLoginMutation } from '@/hook/user';
import { LogoIcon } from '@/components/icon';

import { useRouter } from 'next/router';
import { GoogleLoginButton } from './component/google_login_button';
import { Modal } from 'antd';

export function LoginContent() {
    const login = useLoginMutation()
    const router = useRouter()

    function loginWithGoogle(access_token: string) {
        login.mutate(
            { provider: 'google', access_token },
            {
                onSuccess: () => { router.replace('/'); },
                onError: (error) => { 
                    Modal.error({
                        title: '로그인 오류',
                        content: '잠시후 다시 시도해주세요',
                        centered: true
                    })
                    console.error(error);
                },
            }
        )
    }

    return <div
        style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0 36px',
        }}
    >
        <LogoIcon height={200} style={{ margin: '0 auto', marginBottom: 24 }} />
        <GoogleLoginButton onLogin={loginWithGoogle} option={{ type: 'standard' }} />
    </div>
}