"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  FiClock,
  FiBook,
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiX,
  FiSave,
} from 'react-icons/fi';
import { fetchAPI } from '@/lib/api';

type Course = {
  id: number;
  title: string;
  description: string;
  duration: string;
  fee: number;
  minGrade: string | null;
  others: string | null;
  imageUrl: string;
  publicId: string;
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    fee: '',
    minGrade: '',
    others: '',
    image: null as File | null
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await fetchAPI('/courses');
        setCourses(data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      duration: '',
      fee: '',
      minGrade: '',
      others: '',
      image: null
    });
    setEditingCourse(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, image: file }));
  };

  const handleCreate = async () => {
    if (!formData.image) {
      alert('Image is required');
      return;
    }

    try {
      const form = new FormData();
      form.append('title', formData.title);
      form.append('description', formData.description);
      form.append('duration', formData.duration);
      form.append('fee', formData.fee ? String(Number(formData.fee)) : '0');
      form.append('minGrade', formData.minGrade);
      form.append('others', formData.others);
      form.append('image', formData.image);

      const newCourse = await fetchAPI('/courses', {
        method: 'POST',
        body: form,
      });

      setCourses([...courses, newCourse]);
      resetForm();
      setShowCreateForm(false);
    } catch (err) {
      console.error('Create failed:', err);
      alert('Failed to create course');
    }
  };

  const handleEditClick = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      duration: course.duration,
      fee: course.fee.toString(),
      minGrade: course.minGrade ?? '',
      others: course.others ?? '',
      image: null
    });
    setShowCreateForm(true);
  };

  const handleUpdate = async () => {
    if (!editingCourse) return;

    try {
      const form = new FormData();
      form.append('title', formData.title);
      form.append('description', formData.description);
      form.append('duration', formData.duration);
      form.append('fee', formData.fee ? String(Number(formData.fee)) : '0');
      form.append('minGrade', formData.minGrade);
      form.append('others', formData.others);
      if (formData.image) {
        form.append('image', formData.image);
      }

      const updated = await fetchAPI(`/courses/${editingCourse.id}`, {
        method: 'PUT',
        body: form,
      });

      setCourses(prev =>
        prev.map(course => (course.id === updated.id ? updated : course))
      );
      resetForm();
      setShowCreateForm(false);
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update course');
    }
  };

  const handleDelete = async (id: number, publicId: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      await fetchAPI(`/courses/${id}`, {
        method: 'DELETE',
      });
      setCourses(prev => prev.filter(course => course.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete course');
    }
  };

  const renderForm = () => (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-[#A9A9A9]/20">
      <h2 className="text-2xl font-bold text-[#013220] mb-6">
        {editingCourse ? 'Edit Course' : 'Create New Course'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#013220] mb-2">Course Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full border border-[#A9A9A9]/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF338B] focus:border-transparent text-[#013220]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#013220] mb-2">Duration</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            className="w-full border border-[#A9A9A9]/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF338B] focus:border-transparent text-[#013220]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#013220] mb-2">Tuition Fee</label>
          <input
            type="number"
            name="fee"
            value={formData.fee}
            onChange={handleInputChange}
            className="w-full border border-[#A9A9A9]/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF338B] focus:border-transparent text-[#013220]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#013220] mb-2">Minimum Grade</label>
          <input
            type="text"
            name="minGrade"
            value={formData.minGrade}
            onChange={handleInputChange}
            className="w-full border border-[#A9A9A9]/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF338B] focus:border-transparent text-[#013220]"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-[#013220] mb-2">Description</label>
          <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleInputChange}
            className="w-full border border-[#A9A9A9]/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF338B] focus:border-transparent text-[#013220]"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-[#013220] mb-2">Additional Requirements</label>
          <textarea
            name="others"
            rows={2}
            value={formData.others}
            onChange={handleInputChange}
            className="w-full border border-[#A9A9A9]/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FF338B] focus:border-transparent text-[#013220]"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-[#013220] mb-2">
            Course Image {editingCourse ? '(optional)' : '*'}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-[#A9A9A9]/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF338B] focus:border-transparent text-[#013220]"
            required={!editingCourse}
          />
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={() => {
            setShowCreateForm(false);
            resetForm();
          }}
          className="px-6 py-2 border border-[#A9A9A9]/50 rounded-lg text-[#013220] hover:bg-[#013220]/5 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={editingCourse ? handleUpdate : handleCreate}
          className="px-6 py-2 bg-[#FF338B] text-white rounded-lg hover:bg-[#FF338B]/90 flex items-center gap-2 transition-colors"
        >
          <FiSave /> {editingCourse ? 'Update' : 'Create'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;700&display=swap');
      `}</style>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#013220] mb-4 md:mb-0">Courses</h1>
        <button
          onClick={() => {
            setShowCreateForm(!showCreateForm);
            resetForm();
          }}
          className="flex items-center gap-2 bg-[#013220] text-white px-6 py-3 rounded-lg hover:bg-[#013220]/90 transition-colors"
        >
          {showCreateForm ? <FiX /> : <FiPlus />}
          {showCreateForm ? 'Close Form' : 'Add Course'}
        </button>
      </div>

      {showCreateForm && renderForm()}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#FF338B]"></div>
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-16 bg-[#013220]/5 rounded-xl border border-[#A9A9A9]/20">
          <p className="text-xl text-[#013220]">No courses available</p>
          <p className="text-sm text-[#013220]/60 mt-2">Create your first course to get started</p>
        </div>
      ) : (
        <div className="space-y-8">
          {courses.map(course => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#A9A9A9]/20 hover:shadow-xl transition-all duration-300"
            >
              <div className="md:flex">
                <div className="md:w-1/3 relative h-64 md:h-auto">
                  {course.imageUrl ? (
                    <Image
                      src={course.imageUrl}
                      alt={course.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="bg-[#A9A9A9]/10 flex items-center justify-center h-full w-full text-[#013220]/50">
                      No Image Available
                    </div>
                  )}
                </div>
                <div className="md:w-2/3 p-8 flex flex-col">
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-2xl font-bold text-[#013220] flex items-center">
                        <FiBook className="mr-3 text-[#FF338B]" /> {course.title}
                      </h2>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEditClick(course)}
                          className="text-[#013220] hover:text-[#FF338B] p-2 transition-colors"
                          title="Edit"
                        >
                          <FiEdit2 size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(course.id, course.publicId)}
                          className="text-[#FF338B] hover:text-[#FF338B]/70 p-2 transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </div>
                    </div>
                    <p className="text-[#013220]/80 mb-6">{course.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-start">
                        <FiClock className="text-[#FF338B] mt-1 mr-3" />
                        <div>
                          <h4 className="font-medium text-[#013220]">Duration</h4>
                          <p className="text-[#013220]/80">{course.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="text-[#FF338B] mt-1 mr-3">$</div>
                        <div>
                          <h4 className="font-medium text-[#013220]">Tuition Fee</h4>
                          <p className="text-[#013220]/80">${course.fee.toLocaleString()}</p>
                        </div>
                      </div>
                      {course.minGrade && (
                        <div className="flex items-start">
                          <div className="text-[#FF338B] mt-1 mr-3">📊</div>
                          <div>
                            <h4 className="font-medium text-[#013220]">Minimum Grade</h4>
                            <p className="text-[#013220]/80">{course.minGrade}</p>
                          </div>
                        </div>
                      )}
                      {course.others && (
                        <div className="flex items-start md:col-span-2">
                          <div className="text-[#FF338B] mt-1 mr-3">ℹ️</div>
                          <div>
                            <h4 className="font-medium text-[#013220]">Additional Requirements</h4>
                            <p className="text-[#013220]/80">{course.others}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}