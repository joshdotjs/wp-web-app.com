export default function Footer() {
  return ( 
    <footer aria-labelledby="footer-heading" class="bg-white">
      <h2 id="footer-heading" class="sr-only">Footer</h2>
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 gap-8 border-t border-gray-200 py-20 sm:grid-cols-2 sm:gap-y-0 lg:grid-cols-4">
          <div class="grid grid-cols-1 gap-y-10 lg:col-span-2 lg:grid-cols-2 lg:gap-y-0 lg:gap-x-8">
            <div>
              <h3 class="text-sm font-medium text-gray-900">Account</h3>
              <ul role="list" class="mt-6 space-y-6">
                <li class="text-sm">
                  <a href="#" class="text-gray-500 hover:text-gray-600">Manage Account</a>
                </li>

                <li class="text-sm">
                  <a href="#" class="text-gray-500 hover:text-gray-600">Saved Items</a>
                </li>

                <li class="text-sm">
                  <a href="#" class="text-gray-500 hover:text-gray-600">Orders</a>
                </li>

                <li class="text-sm">
                  <a href="#" class="text-gray-500 hover:text-gray-600">Redeem Gift card</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-900">Service</h3>
              <ul role="list" class="mt-6 space-y-6">
                <li class="text-sm">
                  <a href="#" class="text-gray-500 hover:text-gray-600">Shipping &amp; Returns</a>
                </li>

                <li class="text-sm">
                  <a href="#" class="text-gray-500 hover:text-gray-600">Warranty</a>
                </li>

                <li class="text-sm">
                  <a href="#" class="text-gray-500 hover:text-gray-600">FAQ</a>
                </li>

                <li class="text-sm">
                  <a href="#" class="text-gray-500 hover:text-gray-600">Find a store</a>
                </li>

                <li class="text-sm">
                  <a href="#" class="text-gray-500 hover:text-gray-600">Get in touch</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="grid grid-cols-1 gap-y-10 lg:col-span-2 lg:grid-cols-2 lg:gap-y-0 lg:gap-x-8">
            <div>
              <h3 class="text-sm font-medium text-gray-900">Company</h3>
              <ul role="list" class="mt-6 space-y-6">
                <li class="text-sm">
                  <a href="#" class="text-gray-500 hover:text-gray-600">Who we are</a>
                </li>

                <li class="text-sm">
                  <a href="#" class="text-gray-500 hover:text-gray-600">Press</a>
                </li>

                <li class="text-sm">
                  <a href="#" class="text-gray-500 hover:text-gray-600">Careers</a>
                </li>

                <li class="text-sm">
                  <a href="#" class="text-gray-500 hover:text-gray-600">Terms &amp; Conditions</a>
                </li>

                <li class="text-sm">
                  <a href="#" class="text-gray-500 hover:text-gray-600">Privacy</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-900">Connect</h3>
              <ul role="list" class="mt-6 space-y-6">
                <li class="text-sm">
                  <a href="#" class="text-gray-500 hover:text-gray-600">Instagram</a>
                </li>

                <li class="text-sm">
                  <a href="#" class="text-gray-500 hover:text-gray-600">Pinterest</a>
                </li>

                <li class="text-sm">
                  <a href="#" class="text-gray-500 hover:text-gray-600">Twitter</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-100 py-10 sm:flex sm:items-center sm:justify-between">
          <div class="flex items-center justify-center text-sm text-gray-500">
            <p>Shipping to Canada ($CAD)</p>
            <p class="ml-3 border-l border-gray-200 pl-3">English</p>
          </div>
          <p class="mt-6 text-center text-sm text-gray-500 sm:mt-0">&copy; 2021 Your Company, Inc.</p>
        </div>
      </div>
    </footer>
)};