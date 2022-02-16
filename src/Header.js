import { Image, Heading, useTheme } from "@aws-amplify/ui-react";

export function Header() {
  const { tokens } = useTheme();

  return (
    <>
    <Heading level={1} className={'logo-heading'}>
        <Image
          alt="logo"
          src="https://www.cloudopz.co/logo.png"
          padding={tokens.space.medium}
        />
          <span className={'brand-name'}>{'CloudOpz'}</span>
      </Heading>
    </>
  );
}
