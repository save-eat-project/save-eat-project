import Script from "next/script"
import { useRef } from "react"

type LoginButtonProps = {
  onLogin(credential: string): void,
  option: google.accounts.id.GsiButtonConfiguration,
}
export function GoogleLoginButton(props: LoginButtonProps) {

  const ref = useRef<HTMLDivElement>(null)

  return <>
    <Script
      src="https://accounts.google.com/gsi/client"
      onLoad={() => {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GSI_CLIENT_ID!,
          callback({ credential }) {
            props.onLogin(credential);
          },
        });
        window.google.accounts.id.renderButton(ref.current!, props.option);
      }}
    />
    <div ref={ref} />
  </>
}

