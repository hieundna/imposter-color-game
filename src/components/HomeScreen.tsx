import React from 'react'
import { motion } from 'framer-motion'

interface HomeScreenProps {
  onStart: () => void
  highScore: number
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onStart, highScore }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='text-center'>
      <h1 className='text-5xl font-bold text-gray-800 mb-6'>Imposter Color</h1>
      <p className='text-gray-600 mb-8 max-w-md mx-auto'>
        Find the imposter tile with a slightly different color shade before time runs out!
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className='bg-indigo-600 text-white px-8 py-4 rounded-lg text-xl font-semibold
                 hover:bg-indigo-700 transition-colors shadow-lg mb-8'
      >
        Play Now
      </motion.button>
      <p className='text-gray-600 mb-8 max-w-md mx-auto'>High Score: {highScore}</p>
    </motion.div>
  )
}
