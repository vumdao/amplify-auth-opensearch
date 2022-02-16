import React from 'react';
import { Amplify, Auth } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SignInHeader } from "./SignInHeader";
import { SignInFooter } from "./SignInFooter";
import { localStore } from "./helper";
import "./styles.css";
import Search from './components/Search';
import awsExports from "./aws-exports";


Amplify.configure(awsExports);

function OpenSearch({ signOut }) {
  Auth.currentAuthenticatedUser({
    bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  }).then(user => localStore.set('JWT_TOKEN', user.signInUserSession.accessToken.jwtToken))
    .catch(err => console.log(err));

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: 'dark',
          primary: {
           main: '#FFFFFF',
         },
         secondary: {
           main: '#e50914',
         },
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <div className="Search">
       <Search signOut={() => signOut()} />
      </div>
    </ThemeProvider>
  );
}

export default withAuthenticator(OpenSearch, {
  components: {
    Header,
    SignIn: {
      Header: SignInHeader,
      Footer: SignInFooter
    },
    Footer
  }
});
