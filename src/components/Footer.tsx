import * as Constants from "@/constants/constants";

export default function Footer() {
  return (
    <footer className="bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-500 dark:text-gray-400">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4">
          <a
            className="text-sm hover:text-primary dark:hover:text-primary transition-colors"
            href="#"
          >
            プライバシーポリシー
          </a>
          <a
            className="text-sm hover:text-primary dark:hover:text-primary transition-colors"
            href="#"
          >
            利用規約
          </a>
        </div>
        <p className="text-sm">
          © 2025 {Constants.GroupName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
