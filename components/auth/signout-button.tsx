import { HandleSignOut } from '@/utils/actions';
import { CiLogout } from 'react-icons/ci';

export function SignOut() {
  return (
    <form
      className="w-full"
      action={async () => {
        await HandleSignOut();
      }}
    >
      <button type="submit" className="w-full flex items-center gap-1">
        <CiLogout size={18} />
        <p>Logout</p>
      </button>
    </form>
  );
}
