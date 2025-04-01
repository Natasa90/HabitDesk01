# HabitDesk

HabitDesk is a React Native mobile app designed to help users track their learning habits - they can set goals, track progress, update their learning habits and access free Learining Sources and Blogs.

## Features

- Porch for goal tracking: Set weekly learning goals, track progress, update your daily learnings. 
- Learning insights: View statistics on completed learning sessions.
- To-Do List: Add and delete tasks to manage daily learning activities.
- Blog section: Read articles related to learning and productivity.
- Free study resources: Access a curated list of free study materials.
- Supabase authentication: Manage user accounts securely.

## Tech Stack 

- React Native with Expo
- Supabase for database and authentication
- NativeWind (Tailwind for React Native) for styling

## Installation

 Prerequisites: 
- Node.js and Yarn installed
- Expo CLI installed globally (npm install -g expo-cli)
- Supabase account for database access

### Steps

Clone the repository:

```
git clone https://github.com/Natasa90/habitdesk.git

cd HabitDesk
```

Install dependencies:

```
yarn install
```

Set up environment variables:

Create a .env file and keep your Supabase credentials private. Never commit the .env file to GitHub.

```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

Start the Expo development server:

```
yarn expo start
```

## Usage

- Run the app on a simulator or physical device using Expo Go.
- Create an account or log in using an existing account.
- Set learning goals and track progress through the Porch section.


### Contributing

Contributions are welcome! If you'd like to contribute:

1. Fork the repository.
2. Create a feature branch (git checkout -b feature-name).
3. Commit your changes (git commit -m 'Add new feature').
4. Push to the branch (git push origin feature-name).
5. Open a pull request.

### License

This project is licensed under the MIT License.

Contact

For any questions or feedback, feel free to reach out via GitHub Issues.

