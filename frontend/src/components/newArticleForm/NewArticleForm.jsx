import { Col, Container, Form, Row, Button, Spinner, Alert } from "react-bootstrap"
import { useDropzone } from 'react-dropzone'
import { useState, useEffect, useCallback } from "react"
import useBlogPosts from "../../hooks/useBlogPosts"
import { useAuth } from "../../contexts/AuthContext"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

import TitleSection from "./titleSection/TitleSection"
import CoverSection from "./coverSection/CoverSection"
import CategorySection from "./categorySection/CategorySection"
import ReadTimeSection from "./readTimeSection/ReadTimeSection"
import ContentSection from "./contentSection/ContentSection"
import useUpload from "../../hooks/useUpload"

const NewArticleForm = () => {
  const navigate = useNavigate()
  const { authData } = useAuth()
  const { createBlogPost, blogPostsIsLoading, blogPostsError } = useBlogPosts()
  const { uploadFile, loading: isUploading } = useUpload();

  const [coverImageInputMode, setCoverImageInputMode] = useState("file")
  const [file, setFile] = useState(null)

  const [newArticleForm, setNewArticleForm] = useState({
    title: "",
    cover: "",
    category: "",
    readTime: { value: 0, unit: "minutes" },
    author: "",
    content: ""
  })

  useEffect(() => {
    const authorId = authData?._id || authData?.id
    if (authorId) {
      setNewArticleForm(prev => ({ ...prev, author: authorId }))
    }
  }, [authData])

  const onDrop = useCallback(acceptedFiles => {
    setFile(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { 'image/*': [] }
  })

  const handleFormOnChange = (e) => {
    const { name, value } = e.target
    if (name === "readTimeValue") {
      setNewArticleForm({ ...newArticleForm, readTime: { ...newArticleForm.readTime, value: Number(value) } })
    } else if (name === "readTimeUnit") {
      setNewArticleForm({ ...newArticleForm, readTime: { ...newArticleForm.readTime, unit: value } })
    } else {
      setNewArticleForm({ ...newArticleForm, [name]: value })
    }
  }

  const handleEditorChange = (content) => {
    setNewArticleForm(prev => ({ ...prev, content }))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    let coverUrl = newArticleForm.cover;

    if (coverImageInputMode === 'file') {
      if (!file) return toast.error("Please select an image");

      const resultUrl = await uploadFile(file);
      if (!resultUrl) return toast.error("Image upload failed");
      coverUrl = resultUrl;
    }

    const result = await createBlogPost({ ...newArticleForm, cover: coverUrl });
    if (result) {
      toast.success("Blog post created successfully!");
      navigate('/');
    }
  }

  const switchCoverImageInputMode = (mode) => {
    setCoverImageInputMode(mode)
    if (mode === "file") setNewArticleForm(prev => ({ ...prev, cover: "" }))
    if (mode === "url") setFile(null)
  }

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <Form onSubmit={handleFormSubmit}>
            <TitleSection value={newArticleForm.title} onChange={handleFormOnChange} />

            <CoverSection
              mode={coverImageInputMode}
              setMode={switchCoverImageInputMode}
              file={file}
              getRootProps={getRootProps}
              getInputProps={getInputProps}
              isDragActive={isDragActive}
              value={newArticleForm.cover}
              onChange={handleFormOnChange}
            />

            <CategorySection value={newArticleForm.category} onChange={handleFormOnChange} />

            <ReadTimeSection
              value={newArticleForm.readTime.value}
              unit={newArticleForm.readTime.unit}
              onChange={handleFormOnChange}
            />

            <ContentSection value={newArticleForm.content} onChange={handleEditorChange} />

            {blogPostsError && <Alert variant="danger">{blogPostsError}</Alert>}

            <Button
              type="submit"
              className="btn-dark w-100"
              disabled={blogPostsIsLoading || isUploading}
            >
              {blogPostsIsLoading || isUploading ? (
                <>
                  <Spinner size="sm" className="me-2" />
                  {isUploading ? "Uploading image..." : "Creating post..."}
                </>
              ) : (
                'Create Post'
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default NewArticleForm