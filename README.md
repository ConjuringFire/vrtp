# The Ale Trail (Brewery Finder App)

This is a React application built with Next.js and Tailwind CSS that allows users to search and explore breweries. It fetches data from the Open Brewery DB API.

## Features

- **Browse Breweries:** View a list of breweries with pagination.
- **Search and Filter:** Filter breweries by name and city.
- **Detailed Brewery Information:** View detailed information about each brewery, including a map.
- **Responsive Design:** The application is designed to work seamlessly on various screen sizes.
- **URL Query Parameters:** Filter and search results are saved to the URL, making them shareable and bookmarkable.

## Technologies Used

- **Next.js:** React framework for server-side rendering and static site generation.
- **React:** JavaScript library for building user interfaces.
- **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
- **Open Brewery DB API:** Public API for brewery information.
- **Jest and React Testing Library:** For unit and integration testing.

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone [repository URL]
    cd [repository directory]
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

4.  **Open your browser and navigate to `http://localhost:3000`.**

## Running Tests

To run the unit and integration tests, use the following command:

```bash
npm run test
# or
yarn test
# or
pnpm test
```

## Project Structure

brewery-finder/
├── src/
│ ├── app/
│ │ ├── brewery/
│ │ │ ├── [id].tsx
│ │ ├── fonts.ts
│ │ ├── globals.css
│ │ ├── layout.tsx
│ │ ├── page.tsx
│ ├── components/
│ │ ├── brewery/
│ │ │ ├── AutosuggestInput/
│ │ │ ├── BreweriesTable/
│ │ │ ├── BreweryDetails/
│ │ │ ├── BreweryFilter/
│ │ │ ├── MapComponent/
│ │ ├── common/
│ │ │ ├── Breadcrumbs/
│ │ │ ├── Pagination/
│ │ │ ├── Table/
│ ├── fixtures/
│ │ ├── breweries.fixtures.ts
│ │ ├── table.fixtures.ts
│ ├── hooks/
│ │ ├── useBreweryDetails.ts
│ │ ├── useBrewerySuggestions.ts
│ │ ├── useFetchBreweries.ts
│ ├── types/
│ │ ├── breweries.types.ts
│ │ ├── suggestions.types.ts
│ │ ├── table.types.ts
├── public/
├── package.json
├── README.md
├── next.config.js
├── tailwind.config.js
├── jest.config.js

src/components/: Contains reusable React components.
src/pages/: Contains Next.js pages.
src/styles/: Contains global CSS styles.
public/: Contains static assets.
package.json: Contains project dependencies and scripts.

## Future Improvements

- Add more filtering options (e.g., by state, brewery type).
- Improve the map component with custom markers and information windows.
- Implement server side caching to improve performance.
- Add end to end testing.
- Add better visual cues for the pagination component.
- Improve accessability.
- Contributing
- Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License. 1
