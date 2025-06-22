
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Video, Users, Award, Clock, Star, Shield, FileText, TrendingUp } from 'lucide-react';

const EducationSection = () => {
  const courses = [
    {
      title: 'Stock Market Basics',
      description: 'Learn the fundamentals of stock market investing and trading',
      duration: '4 hours',
      level: 'Beginner',
      rating: 4.8,
      students: '12,450',
      icon: BookOpen
    },
    {
      title: 'Technical Analysis Masterclass',
      description: 'Advanced charting techniques and technical indicators',
      duration: '8 hours',
      level: 'Advanced',
      rating: 4.9,
      students: '8,760',
      icon: TrendingUp
    },
    {
      title: 'Options Trading Strategies',
      description: 'Comprehensive guide to options trading and strategies',
      duration: '6 hours',
      level: 'Intermediate',
      rating: 4.7,
      students: '6,230',
      icon: Award
    },
    {
      title: 'Risk Management',
      description: 'Learn to manage risks and protect your investments',
      duration: '3 hours',
      level: 'Beginner',
      rating: 4.6,
      students: '9,840',
      icon: Shield
    }
  ];

  const resources = [
    {
      title: 'Investment Guide for Beginners',
      type: 'PDF Guide',
      downloads: '25,000+',
      icon: FileText
    },
    {
      title: 'Market Analysis Webinars',
      type: 'Live Sessions',
      participants: '50,000+',
      icon: Video
    },
    {
      title: 'Trading Simulator',
      type: 'Practice Tool',
      users: '100,000+',
      icon: TrendingUp
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Investor Education</h2>
          <p className="text-gray-600">Enhance your financial knowledge with our comprehensive education programs</p>
        </div>

        {/* Featured Courses */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Featured Courses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, index) => {
              const IconComponent = course.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <IconComponent className="h-5 w-5 text-blue-600" />
                      </div>
                      <Badge variant={course.level === 'Beginner' ? 'secondary' : course.level === 'Advanced' ? 'destructive' : 'default'}>
                        {course.level}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">
                      {course.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {course.duration}
                        </span>
                        <span className="flex items-center text-gray-500">
                          <Users className="h-4 w-4 mr-1" />
                          {course.students}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        {course.rating} rating
                      </div>
                    </div>
                    
                    <Button className="w-full" size="sm">
                      Enroll Now
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Resources Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Free Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((resource, index) => {
              const IconComponent = resource.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                      <IconComponent className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{resource.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{resource.type}</p>
                    <div className="text-blue-600 font-medium text-sm mb-4">
                      {resource.downloads || resource.participants || resource.users}
                    </div>
                    <Button variant="outline" size="sm">
                      Access Free
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Safety & Guidelines */}
        <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-8">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Safe Investing Guidelines
                </h3>
                <p className="text-gray-600 mb-4">
                  Learn about safe investing practices, common scams to avoid, and regulatory protections 
                  available to investors. Stay informed and protect your investments.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    KYC Compliance
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    SEBI Guidelines
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    Investor Protection
                  </div>
                </div>
                <Button className="mt-4" variant="outline">
                  Learn More About Safety
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default EducationSection;
