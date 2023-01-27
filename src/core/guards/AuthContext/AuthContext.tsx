// https://codesandbox.io/s/route-interceptor-es6-0p88j
import { Language } from '../../../assets/langs/lang';
import { decrypt } from '../../../shared/crypto';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export const AuthRouteComponent = (props) => {
     const navigate = useNavigate();

     React.useEffect(() => {
          if (!decrypt(sessionStorage.getItem('me')!)) {
               toast.error(Language.LANG.UNLOGGED_MESSAGE)
               navigate('/login');
          }
     }, [props?.location?.pathname, navigate]);

     return props.children;
}