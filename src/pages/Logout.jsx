import { useDispatch } from 'react-redux';
import { logout } from '../store/auth/slice';

function Logout() {
  const dispatch = useDispatch();

  dispatch(logout());
}

export default Logout;
