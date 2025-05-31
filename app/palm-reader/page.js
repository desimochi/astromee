'use client'

import PalmScanner from '@/componenet/PalmScanner'
import DotBack from '@/componenet/ui/DotBack'
import { HandIcon } from 'lucide-react'
import { useState } from 'react'

export default function Home() {
  const [file, setFile] = useState(null)
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    setError(null)
    setPrediction(null)

    try {
      // Upload image to your image upload endpoint
      const uploadForm = new FormData()
      uploadForm.append('image', file)

      const uploadRes = await fetch('/api/image-upload', {
        method: 'POST',
        body: uploadForm,
      })

      if (!uploadRes.ok) {
        throw new Error('Image upload failed')
      }

      const { url } = await uploadRes.json()

      // Send the uploaded image URL to palm reader API
      const res = await fetch('/api/palm-reader', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: url }),
      })
const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error)
        
      }
      console.log(data)
      setPrediction(data)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    }

    setLoading(false)
  }
  return (
    <DotBack>
        <div className='z-21 py-36'>
          <div className="flex w-40  justify-center mx-auto px-4 text-center-2 mb-3 border border-yellow-500 rounded-full text-sm bg-yellow-500/50 backdrop-blur-sm">
        <span className="text-black">Scan Your Palm</span>
          </div>
          <div className='max-w-7xl mx-auto'>
  <h1 className="text-4xl sm:text-6xl font-bold mb-2 bg-gradient-to-b from-yellow-200 to-yellow-700 bg-clip-text text-transparent text-center">Palm Reader</h1>
<p className="text-center text-sm p-2 sm:text-sm ">Discover your unique astrological insights with your palm as our palm reader scan your palm lines and provides the important life events information.</p>
          </div>
    
      <div className='flex max-w-7xl mx-auto gap-4 items-center'>
      <div className='w-1/2'>
      <div className='px-2 py-4'>
        <label className='font-bold mb-2'>Upload Palm Image </label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="border p-2 w-full mt-2"
      />

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded disabled:bg-blue-300 flex items-center gap-2"
      >
        <HandIcon  className='h-4 w-4'/>{loading ? 'Analyzing...' : 'Analyze My Palm'}
      </button>
</div>
     {error && (
  <div className="mt-4 p-3 bg-red-100 text-red-700 rounded border border-red-300">
    <strong>Error:</strong> {error}
    {error.includes('palm image') && (
      <p className="text-sm mt-1">Tip: Upload a well-lit photo of your palm with fingers open and lines visible.</p>
    )}
  </div>
)}

     
      </div>
      <div className='w-1/2'>
       {loading ? <PalmScanner/>  : 
       prediction ?  (
        <div className="mt-6 p-4 border border-yellow-600 rounded shadow">
          <h2 className="font-semibold mb-2">Prediction:</h2>
          <ul className="list-disc list-inside">
            <li>
              <strong>Love Life:</strong> {prediction.loveLife}
            </li>
            <li>
              <strong>Career:</strong> {prediction.career}
            </li>
            <li>
              <strong>Health:</strong> {prediction.health}
            </li>
          </ul>
        </div>
      ) : (
        <p>Upload an Image to Scan Your Palm</p>
      )}
      </div>
      </div>
      </div>
    </DotBack>
  )
}
