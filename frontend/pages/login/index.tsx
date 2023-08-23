import Script from "next/script"
import { useRef } from "react"

type LoginButtonProps = {
  config: google.accounts.id.IdConfiguration
  style: google.accounts.id.GsiButtonConfiguration
}
function GoogleLoginButton(props: LoginButtonProps) {

  const ref = useRef<HTMLDivElement>(null)


  return <>
    <Script src="https://accounts.google.com/gsi/client" onLoad={() => {
      window.google.accounts.id.initialize(props.config);
      window.google.accounts.id.renderButton(ref.current!, props.style);
    }} />
    <div ref={ref} />
  </>
}


export default function LoginPage() {
  return <div>
    LoginPage
    <GoogleLoginButton
      config={{
        client_id: process.env.NEXT_PUBLIC_GSI_CLIENT_ID!,
        callback: ({ credential }) => {
          console.log('login success', credential);
        }
      }}
      style={{ type: 'standard', }}
    />
  </div>
}