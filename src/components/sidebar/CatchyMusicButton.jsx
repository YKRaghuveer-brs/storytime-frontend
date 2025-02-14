import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toggleSidebarMinimize } from '../../store/user/authSlice';

const CatchyMusicButton = () => {
  const dispatch = useDispatch();
    const maximize = () => {
       dispatch(toggleSidebarMinimize())
      }

  useEffect(() => {
    // Wait for the button to appear (you can adjust this delay)
    // setIsVisible(true);
  }, []);

  return (
    <button
    onClick={maximize}
      className="z-20 drop-in fixed bottom-10 right-20 bg-purple-700 text-white py-2 px-4 rounded-full text-xl shadow-lg focus:outline-none" 
    
      style={{
        transition: 'all 0.3s ease-in-out',
      }}
    >

<img height="60" width="60" src="https://i.ibb.co/WyFTYYM/Animation-1737792934234.gif" alt="Music Player" />
    </button>
  );
};

// const App = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

//   return (
//     <div>
//       {/* Sidebar logic goes here */}
//       {(!isSidebarMinimized && isSidebarOpen) && <CatchyMusicButton />}
//       <RouterProvider router={router} />
//     </div>
//   );
// };

export default CatchyMusicButton;
