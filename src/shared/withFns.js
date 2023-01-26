import { useNavigate, useParams } from 'react-router-dom';

export function withParams(Component) {
     return props => <Component {...props} params={useParams()} />;
}

export const withRouter = (Component) => {
     const Wrapper = (props) => {
          const navigate = useNavigate();

          return (
               <Component
                    navigate={navigate}
                    {...props}
               />
          );
     };

     return Wrapper;
};