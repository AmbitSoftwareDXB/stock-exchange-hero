
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Twitter, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Products & Services',
      links: [
        'Equity Trading',
        'Derivatives',
        'Currency Trading',
        'Commodities',
        'Mutual Funds',
        'IPO Services'
      ]
    },
    {
      title: 'Resources',
      links: [
        'Market Data',
        'Research Reports',
        'Investment Tools',
        'Educational Content',
        'Mobile Apps',
        'API Services'
      ]
    },
    {
      title: 'Support',
      links: [
        'Help Center',
        'Contact Us',
        'Dispute Resolution',
        'Feedback',
        'Branch Locator',
        'Download Forms'
      ]
    },
    {
      title: 'Legal & Compliance',
      links: [
        'Terms of Service',
        'Privacy Policy',
        'Regulatory Disclosures',
        'Investor Charter',
        'Grievance Policy',
        'Risk Disclosures'
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-300">Get latest market updates and insights delivered to your inbox</p>
            </div>
            <div className="flex w-full md:w-auto space-x-2">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 md:w-64"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-xl mb-4 w-fit">
              FinanceHub
            </div>
            <p className="text-gray-300 mb-4">
              India's leading stock exchange platform providing comprehensive financial services and market solutions.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Youtube className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold text-lg mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="flex items-start space-x-3">
            <Phone className="h-5 w-5 text-blue-400 mt-1" />
            <div>
              <h5 className="font-semibold mb-1">Customer Support</h5>
              <p className="text-gray-300 text-sm">1800-123-4567</p>
              <p className="text-gray-300 text-sm">support@financehub.com</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Mail className="h-5 w-5 text-blue-400 mt-1" />
            <div>
              <h5 className="font-semibold mb-1">Business Enquiries</h5>
              <p className="text-gray-300 text-sm">business@financehub.com</p>
              <p className="text-gray-300 text-sm">partnerships@financehub.com</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-blue-400 mt-1" />
            <div>
              <h5 className="font-semibold mb-1">Head Office</h5>
              <p className="text-gray-300 text-sm">Exchange Plaza, Bandra Kurla Complex</p>
              <p className="text-gray-300 text-sm">Mumbai - 400051, India</p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Regulatory Information */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h4 className="font-semibold text-lg mb-4">Regulatory Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div>
              <p className="mb-2">
                <strong>SEBI Registration:</strong> INZ000123456 (Stock Broker)
              </p>
              <p className="mb-2">
                <strong>NSE Member Code:</strong> 12345
              </p>
              <p className="mb-2">
                <strong>BSE Member Code:</strong> 6789
              </p>
            </div>
            <div>
              <p className="mb-2">
                <strong>CDSL DP ID:</strong> 12081600
              </p>
              <p className="mb-2">
                <strong>NSDL DP ID:</strong> IN300394
              </p>
              <p className="mb-2">
                <strong>MCX Member Code:</strong> 56789
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            Compliance Officer: John Doe | Email: compliance@financehub.com | Phone: +91-22-1234-5678
          </p>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="mb-4 md:mb-0">
            <p>&copy; 2024 FinanceHub. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap space-x-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Cookie Policy</a>
            <a href="#" className="hover:text-white">Sitemap</a>
          </div>
        </div>

        {/* Risk Disclaimer */}
        <div className="mt-8 p-4 bg-yellow-900 bg-opacity-30 border border-yellow-600 rounded-lg">
          <p className="text-yellow-200 text-xs leading-relaxed">
            <strong>Risk Disclaimer:</strong> Trading in securities market are subject to market risks. 
            Read all the related documents carefully before investing. Please consider your specific 
            investment requirements before choosing a fund, or designing a portfolio that suits your needs.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
