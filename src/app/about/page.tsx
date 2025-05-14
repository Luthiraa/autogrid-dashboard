'use client';

import { UserGroupIcon, AcademicCapIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import Image from 'next/image'
import Link from 'next/link'
import { EnvelopeIcon, GlobeAltIcon, PhoneIcon } from '@heroicons/react/24/outline'

const teamMembers = [
  {
    name: 'Krish Chhajer',
    role: '2nd Year ECE Student, University of Toronto',
    bio: 'Specialized in developing reinforcement learning models for different environments, focusing on optimizing microgrid control systems.',
    image: '/images/team/krish.jpg'
  },
  {
    name: 'Kenny Guo',
    role: '2nd Year ECE Student, University of Toronto',
    bio: 'Focused on creating and implementing reinforcement learning models for various environments, with expertise in model optimization.',
    image: '/images/team/kenny.jpg'
  },
  {
    name: 'Luthira Abeykoon',
    role: '2nd Year ECE Student, University of Toronto',
    bio: 'Frontend development, API integration, and created forecasting models. Responsible for bringing together different components into the final product.',
    image: '/images/team/luthira.jpg'
  },
  {
    name: 'Nick Eckhert',
    role: '2nd Year Industrial Engineering Student, University of Toronto',
    bio: 'Specialized in synthetic data generation and development of baseline models for system performance comparison.',
    image: '/images/team/nick.jpg'
  }
];

const mentor = {
  name: 'Lorne Schell',
  role: 'Project Mentor',
  image: '/images/team/Lorne.jpg',
  bio: ''
};

const features = [
  {
    title: 'Expert Team',
    description: 'Our team consists of experienced professionals in energy systems, software development, and user experience design.',
    icon: UserGroupIcon
  },
  {
    title: 'Academic Excellence',
    description: 'We combine academic research with practical implementation to deliver cutting-edge solutions.',
    icon: AcademicCapIcon
  },
  {
    title: 'Technical Innovation',
    description: 'Leveraging the latest technologies to build robust and scalable microgrid management systems.',
    icon: CodeBracketIcon
  }
];

const contactInfo = [
  {
    icon: EnvelopeIcon,
    label: 'Email',
    value: 'contact@autogrid.ai',
    href: 'mailto:contact@autogrid.ai'
  },
  {
    icon: PhoneIcon,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567'
  },
  {
    icon: GlobeAltIcon,
    label: 'Website',
    value: 'www.autogrid.ai',
    href: 'https://www.autogrid.ai'
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">About Us</h1>
            <Link
              href="/"
              className="text-blue-500 hover:text-blue-600 font-semibold"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission Statement */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              To revolutionize energy management through artificial intelligence, 
              making sustainable energy solutions accessible and efficient for everyone.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Development Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-blue-500 mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mentor Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Mentor</h2>
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative w-48 h-48 flex-shrink-0">
                <Image
                  src={mentor.image}
                  alt={mentor.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-semibold text-gray-900">{mentor.name}</h3>
                <p className="text-blue-500 mb-4">{mentor.role}</p>
                <p className="text-gray-600">{mentor.bio}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white rounded-lg shadow-lg p-6">
                <feature.icon className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <item.icon className="h-6 w-6 text-blue-500 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">{item.label}</div>
                    <div className="text-gray-900 font-medium">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}