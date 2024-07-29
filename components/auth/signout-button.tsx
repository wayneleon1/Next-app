import { HandleSignOut } from "@/utils/actions";

export function SignOut() {
  return (
    <form
      action={async () => {
        await HandleSignOut();
      }}
    >
      <button type="submit">Logout</button>
    </form>
  );
}
