import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/Button";
import Logo from "./ui/Logo";
import { Sparkles, Zap, Search, Globe, Check, Star, Users, TrendingUp, Shield, ArrowRight, MessageSquare } from "lucide-react";
import { BACKGROUND_IMAGE_URL } from "../utils/constants";

const LandingPage = () => {
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      text: "This AI recommendation engine completely changed how I discover content. No more scrolling for hours—just ASK and watch.",
      author: "Sarah Chen",
      role: "Content Creator",
      rating: 5
    },
    {
      text: "The accuracy of recommendations is incredible. It understands my preferences better than any algorithm I've seen.",
      author: "Marcus Rodriguez",
      role: "Film Enthusiast",
      rating: 5
    },
    {
      text: "Finally, a platform that speaks my language. The AI understands context and delivers spot-on suggestions every time.",
      author: "Priya Patel",
      role: "Movie Critic",
      rating: 5
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-indigo-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md border-b border-white/5">
        <Logo size="md" />
        <Button
          variant="outline"
          onClick={handleGetStarted}
          className="border-indigo-500/30 hover:bg-indigo-500/10 hover:text-indigo-400 hover:border-indigo-500/50"
        >
          Sign In
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center overflow-hidden pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-full blur-[150px] mix-blend-screen animate-pulse" />
          <div className="absolute bottom-[-30%] right-[-20%] w-[600px] h-[600px] bg-gradient-to-l from-pink-600/15 to-orange-600/15 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDelay: '1s' }} />
          <div
            className="absolute inset-0 bg-cover bg-center opacity-8"
            style={{ backgroundImage: `url(${BACKGROUND_IMAGE_URL})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/60" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium animate-fade-in">
            <Sparkles size={14} className="animate-pulse" />
            <span>AI-Powered Content Discovery Platform</span>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-tight bg-gradient-to-br from-white via-white to-indigo-200 bg-clip-text text-transparent animate-fade-in-up">
              Stop Searching.<br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Start Discovering.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Transform how you find entertainment. Ask in natural language and let our AI curate
              <span className="text-indigo-400 font-semibold"> personalized recommendations</span> from millions of movies and TV shows.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 py-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">500K+</div>
              <div className="text-gray-400 text-sm">Movies & TV Shows</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">98%</div>
              <div className="text-gray-400 text-sm">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50K+</div>
              <div className="text-gray-400 text-sm">Happy Users</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Button
              size="lg"
              onClick={handleGetStarted}
              className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-0 shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:shadow-[0_0_40px_rgba(79,70,229,0.6)] transition-all duration-300 px-8 py-4 text-lg font-semibold group"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-6 mt-12 text-gray-400 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-sm">4.9/5 from 2,300+ reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-gradient-to-b from-black to-gray-950 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Why Choose MediaRecs-AI?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience the future of content discovery with our cutting-edge AI technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-indigo-950/50 to-purple-950/30 border border-indigo-500/20 hover:border-indigo-400/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-[0_0_30px_rgba(79,70,229,0.2)]">
              <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform shadow-lg">
                <MessageSquare size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Natural Language AI</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                "Show me mind-bending sci-fi movies like Inception but with time travel elements"
                — Ask like you would a friend, get personalized results.
              </p>
              <div className="flex items-center text-indigo-400 text-sm font-medium">
                <Check size={16} className="mr-2" />
                Context-aware understanding
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-950/50 to-pink-950/30 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform shadow-lg">
                <Zap size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Lightning Fast</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Get instant recommendations powered by real-time TMDB data, trailers, and ratings.
              </p>
              <div className="flex items-center text-purple-400 text-sm font-medium">
                <Check size={16} className="mr-2" />
                &lt; 2 second response time
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-pink-950/50 to-orange-950/30 border border-pink-500/20 hover:border-pink-400/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-[0_0_30px_rgba(236,72,153,0.2)]">
              <div className="w-14 h-14 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform shadow-lg">
                <Globe size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Global & Local</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Search in 25+ languages. AI understands cultural context and regional preferences.
              </p>
              <div className="flex items-center text-pink-400 text-sm font-medium">
                <Check size={16} className="mr-2" />
                Multi-language support
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-950/50 to-cyan-950/30 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform shadow-lg">
                <TrendingUp size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Smart Analytics</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Track your viewing patterns and get predictive recommendations based on your taste evolution.
              </p>
              <div className="flex items-center text-blue-400 text-sm font-medium">
                <Check size={16} className="mr-2" />
                Learning algorithm
              </div>
            </div>

            {/* Feature 5 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-green-950/50 to-emerald-950/30 border border-green-500/20 hover:border-green-400/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]">
              <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform shadow-lg">
                <Users size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Social Discovery</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                See what friends are watching and share recommendations in our community.
              </p>
              <div className="flex items-center text-green-400 text-sm font-medium">
                <Check size={16} className="mr-2" />
                Community features
              </div>
            </div>

            {/* Feature 6 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-orange-950/50 to-red-950/30 border border-orange-500/20 hover:border-orange-400/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-[0_0_30px_rgba(249,115,22,0.2)]">
              <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform shadow-lg">
                <Shield size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Privacy First</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Your viewing preferences stay private. We never sell your data or track you across sites.
              </p>
              <div className="flex items-center text-orange-400 text-sm font-medium">
                <Check size={16} className="mr-2" />
                GDPR compliant
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/20 to-purple-950/20" />
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Loved by Content Creators
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join thousands of filmmakers, critics, and entertainment professionals
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="bg-gradient-to-r from-indigo-950/50 to-purple-950/50 border border-indigo-500/20 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
                <div className="flex items-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} size={20} className="fill-yellow-400 text-yellow-400 mr-1" />
                  ))}
                </div>
                <blockquote className="text-2xl md:text-3xl font-medium text-white mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonials[currentTestimonial].author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonials[currentTestimonial].author}</div>
                    <div className="text-gray-400">{testimonials[currentTestimonial].role}</div>
                  </div>
                </div>
              </div>

              {/* Testimonial Navigation */}
              <div className="flex justify-center mt-8 gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial
                        ? 'bg-indigo-500 w-8'
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.03)_1px,transparent_0)] bg-[length:60px_60px]" />
        </div>
        <div className="container mx-auto px-6 text-center relative">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
              Ready to Revolutionize Your Content Discovery?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join the future of entertainment. Start your free trial today and experience AI-powered recommendations like never before.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="bg-white text-black hover:bg-gray-100 px-12 py-4 text-lg font-semibold shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <div className="text-gray-400">
                <span className="text-sm">No credit card required • Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <Logo size="sm" />
            <div className="flex items-center gap-6 mt-6 md:mt-0 text-gray-400 text-sm">
              <span>© {new Date().getFullYear()} MediaRecs-AI. All rights reserved.</span>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
