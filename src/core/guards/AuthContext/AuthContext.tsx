// https://codesandbox.io/s/route-interceptor-es6-0p88j
import { Router } from '../../..';
import { Language } from '../../../assets/langs/lang';
import { decrypt } from '../../../shared/crypto';
import { Role } from '../../enums/Role';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export const AuthRouteComponent = (props) => {
     const navigate = useNavigate();

     React.useEffect(() => {
          Router.fn ||= navigate;
          if (!sessionStorage.getItem('me')) {
               toast.error(Language.LANG.UNLOGGED_MESSAGE)
               navigate('/login');
          }
          const role = Role[props.role];
          const userRole = Role[decrypt(sessionStorage.getItem('ROLE')!)]
          if (userRole < role) {
               toast(Language.LANG.ACCESS_DENIED)
               navigate('/');
          }
     }, [props?.location?.pathname, navigate, props?.role]);

     return props.children;
}