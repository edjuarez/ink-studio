import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import FadeIn from "../../components/ui/FadeIn";
import { contentData } from "../../data/data";
import { useAdminAuth } from "../../context/useAdminAuth";
import { isUnauthorizedError } from "../../services/admin";

export default function LoginPage() {
  const { login } = useAdminAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(null);
    setSubmitting(true);

    try {
      await login(username, password);

      // On success the auth context updates and the protected routes
      // redirect automatically.
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "Error de servidor"
      );

      if (!isUnauthorizedError(caught)) {
        console.error(caught);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#efecec] px-6 py-16">
      <FadeIn className="w-full max-w-md">
        <div className="border border-neutral-300 bg-surface px-8 py-10 sm:px-12">
          <p className="section-name">
            {contentData.admin.login.eyebrow}
          </p>

          <h1 className="section-title-secondary">
            {contentData.admin.login.title}
          </h1>

          <p className="mt-4 text-sm leading-6 text-neutral-600">
            {contentData.admin.login.description}
          </p>

          <form onSubmit={onSubmit} className="mt-10 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="admin-username"
                className="section-form-label"
              >
                {contentData.admin.login.usernameLabel}
              </label>

              <input
                id="admin-username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder={contentData.admin.login.usernamePlaceholder}
                className="border-b border-neutral-400 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="admin-password"
                className="section-form-label"
              >
                {contentData.admin.login.passwordLabel}
              </label>

              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={contentData.admin.login.passwordPlaceholder}
                className="border-b border-neutral-400 bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900"
              />
            </div>

            {error && (
              <div className="border border-red-300 px-4 py-4 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="group flex cursor-pointer items-center justify-center gap-3 border border-neutral-900 bg-neutral-900 px-6 py-4 text-xs uppercase tracking-[0.18em] text-[#E8E8E8] transition-colors duration-300 hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting
                ? contentData.admin.login.submitting
                : contentData.admin.login.submit}

              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </button>
          </form>

          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-neutral-500 transition-colors hover:text-neutral-900"
          >
            {contentData.admin.login.backToSite}
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </FadeIn>
    </main>
  );
}