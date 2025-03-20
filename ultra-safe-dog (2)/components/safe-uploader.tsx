"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Twitter, Download } from "lucide-react"

export default function SafeUploader() {
  const [uploadedImageUrl, setUploadedImageUrl] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const safeImageRef = useRef<HTMLImageElement>(null)

  // Handle file upload
  function handleUpload() {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"

    input.onchange = () => {
      if (input.files && input.files[0]) {
        setIsUploading(true)

        const file = input.files[0]
        const reader = new FileReader()

        reader.onload = () => {
          if (typeof reader.result === "string") {
            setUploadedImageUrl(reader.result)
            setIsUploading(false)
          } else {
            setIsUploading(false)
          }
        }

        reader.onerror = () => {
          setIsUploading(false)
        }

        reader.readAsDataURL(file)
      }
    }

    input.click()
  }

  // Clear the uploaded image
  function clearImage() {
    setUploadedImageUrl("")
  }

  // Share to X (Twitter)
  function shareToX() {
    // Since the image is locally uploaded and not hosted online,
    // we can only share the text content
    const text = encodeURIComponent("$USD #UltraSafeDog")
    const shareUrl = `https://twitter.com/intent/tweet?text=${text}`
    window.open(shareUrl, "_blank")
  }

  // Download the image as JPEG
  function downloadImage() {
    if (!uploadedImageUrl) return

    // Create a temporary link element
    const link = document.createElement("a")
    link.href = uploadedImageUrl
    link.download = "ultra-safe-dog-asset.jpeg"

    // Append to the document, click it, and remove it
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Measure and position the image container when the safe image loads
  useEffect(() => {
    if (!safeImageRef.current || !imageContainerRef.current) return

    // Function to update the image container position
    function updateImageContainerPosition() {
      const safeImg = safeImageRef.current
      const container = imageContainerRef.current
      if (!safeImg || !container) return

      // Get the dimensions of the safe image
      const safeWidth = safeImg.offsetWidth
      const safeHeight = safeImg.offsetHeight

      // Calculate the dimensions and position of the safe opening
      const openingWidth = safeWidth * 0.42
      const openingHeight = safeHeight * 0.75

      // Adjust the left position to move the container 25% more to the right
      const openingLeft = safeWidth * 0.08 + openingWidth * 0.25
      const openingTop = safeHeight * 0.12

      // Update the CSS for the image container
      container.style.width = `${openingWidth}px`
      container.style.height = `${openingHeight}px`
      container.style.left = `${openingLeft}px`
      container.style.top = `${openingTop}px`

      // Add perspective to the container for 3D effect
      container.style.perspective = "1000px"
    }

    // Initial update
    const safeImg = safeImageRef.current
    if (safeImg.complete) {
      updateImageContainerPosition()
    } else {
      safeImg.onload = updateImageContainerPosition
    }

    // Update on window resize
    window.addEventListener("resize", updateImageContainerPosition)

    return () => {
      window.removeEventListener("resize", updateImageContainerPosition)
    }
  }, [])

  return (
    <div className="flex flex-col items-center">
      <div className="mb-8 w-full max-w-xl">
        <div className="flex justify-center">
          <div className="relative w-full max-w-md">
            {/* Background safe image - replaced Next.js Image with standard img */}
            <img src="/images/safee.jpg" alt="Safe Background" className="w-full h-auto" />

            {/* Uploaded image container - positioned absolutely to match the safe opening */}
            <div
              ref={imageContainerRef}
              className="absolute overflow-hidden flex items-center justify-center"
              style={{
                backgroundColor: "transparent",
              }}
            >
              {uploadedImageUrl && (
                <img
                  src={uploadedImageUrl || "/placeholder.svg"}
                  alt="Uploaded Asset"
                  className="max-w-full max-h-full object-contain"
                  style={{
                    transform: "rotateY(10deg)", // 10% warp to the right
                    transformOrigin: "center left", // Pivot from the left side
                    transformStyle: "preserve-3d", // Maintain 3D effect
                  }}
                />
              )}
            </div>

            {/* Foreground safe image - replaced Next.js Image with standard img */}
            <div className="absolute inset-0">
              <img ref={safeImageRef} src="/images/safe.png" alt="Ultra Safe Dog Vault" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <Button
          onClick={handleUpload}
          disabled={isUploading}
          className="bg-yellow-500 hover:bg-yellow-600 text-black"
          size="lg"
        >
          {isUploading ? "Uploading..." : uploadedImageUrl ? "Change Asset" : "Upload Asset to Vault"}
        </Button>

        {uploadedImageUrl && (
          <div className="flex flex-wrap gap-3 justify-center">
            <Button variant="outline" onClick={clearImage} className="border-red-500 text-red-500 hover:bg-red-500/10">
              Remove Asset
            </Button>

            <Button onClick={shareToX} className="bg-black hover:bg-gray-800 text-white border border-gray-700">
              <Twitter className="w-4 h-4 mr-2" />
              Share on X with $USD
            </Button>

            <Button onClick={downloadImage} className="bg-yellow-500 hover:bg-yellow-600 text-black">
              <Download className="w-4 h-4 mr-2" />
              Download JPEG
            </Button>
          </div>
        )}

        <p className="text-sm text-gray-400 max-w-md text-center mt-4">
          Upload any image to store it securely in your Ultra Safe Dog vault. Your assets are protected by the most
          advanced canine security system in crypto.
        </p>
      </div>
    </div>
  )
}

