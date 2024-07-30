import { HandleSignIn } from '@/utils/actions';
import { FaGithub } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

export function SignIn() {
  return (
    <form
      action={async () => {
        await HandleSignIn();
      }}
    >
      <Button
        type="submit"
        variant="outline"
        className="mt-2 w-full flex items-center justify-center gap-2 border border-gray-300 "
      >
        <FaGithub className="text-xl" />
        Continue with GitHub
      </Button>
    </form>
  );
}
