import { SITE_NAME } from "@/constants/constants";

export default function Footer() {
  return (
    <footer className="bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-500 dark:text-gray-400">
        <p className="text-sm">
          © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
