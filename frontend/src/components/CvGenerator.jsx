import { useState } from 'react';
import { jsPDF } from 'jspdf';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash2, X } from 'lucide-react';

// Mock database data - replace with your actual data fetching logic
const userData = {
  fullName: "John Doe",
  email: "john@example.com",
  phone: "+1234567890",
  imageUrl: "https://spoonacular.com/recipeImages/604524-556x370.jpg?not-from-cache-please"
};

const CVGenerator = () => {
  const [formData, setFormData] = useState({
    // Pre-filled data from database
    fullName: userData.fullName,
    email: userData.email,
    phone: userData.phone,
    imageUrl: userData.imageUrl,
    // User input fields
    profile: '',
    skills: [],
    education: [],
    experience: [],
    insights: []
  });

  const [showPreview, setShowPreview] = useState(false);
  const [currentSkill, setCurrentSkill] = useState('');
  
  const addSkill = () => {
    if (currentSkill.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()]
      }));
      setCurrentSkill('');
    }
  };

  const removeSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { institution: '', degree: '', year: '', description: '' }]
    }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, { 
        company: '', 
        position: '', 
        duration: '', 
        description: '' 
      }]
    }));
  };

  const addInsight = () => {
    setFormData(prev => ({
      ...prev,
      insights: [...prev.insights, { category: '', description: '' }]
    }));
  };

  //for the remove education section
  const removeEducation = (index) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

   // for the remove experience section
   const removeExperience = (index) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };


   // for the remove insight section
   const removeInsight = (index) => {
    setFormData(prev => ({
      ...prev,
      insights: prev.insights.filter((_, i) => i !== index)
    }));
  };


  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = 20;
    
    // Helper function to add a line break
    const addLineBreak = () => {
      doc.setDrawColor(200);
      doc.line(20, yPos, pageWidth - 20, yPos);
      yPos += 10;
    };

    // Header section
    doc.setFontSize(20);
    doc.text(formData.fullName, pageWidth / 2, yPos, { align: 'center' });
    yPos += 10;
    
    doc.setFontSize(12);
    doc.text(formData.email, pageWidth / 2, yPos, { align: 'center' });
    yPos += 7;
    doc.text(formData.phone, pageWidth / 2, yPos, { align: 'center' });
    yPos += 10;
    
    addLineBreak();

    // Profile section
    doc.setFontSize(16);
    doc.text('Profile', 20, yPos);
    yPos += 7;
    doc.setFontSize(12);
    const profileLines = doc.splitTextToSize(formData.profile, pageWidth - 40);
    doc.text(profileLines, 20, yPos);
    yPos += (profileLines.length * 7) + 10;
    
    addLineBreak();

    // Skills section
    doc.setFontSize(16);
    doc.text('Skills', 20, yPos);
    yPos += 7;
    doc.setFontSize(12);
    const skillsText = formData.skills.join(', ');
    const skillsLines = doc.splitTextToSize(skillsText, pageWidth - 40);
    doc.text(skillsLines, 20, yPos);
    yPos += (skillsLines.length * 7) + 10;
    
    addLineBreak();

    // Education section
    doc.setFontSize(16);
    doc.text('Education', 20, yPos);
    yPos += 10;
    doc.setFontSize(12);
    formData.education.forEach(edu => {
      doc.text(`${edu.institution} - ${edu.degree}`, 20, yPos);
      yPos += 7;
      doc.text(edu.year, 20, yPos);
      yPos += 7;
      const eduLines = doc.splitTextToSize(edu.description, pageWidth - 40);
      doc.text(eduLines, 20, yPos);
      yPos += (eduLines.length * 7) + 5;
    });
    yPos += 5;
    
    addLineBreak();

    
    // Experience section
    if (formData.experience.length > 0) {
      doc.setFontSize(16);
      doc.text('Experience', 20, yPos);
      yPos += 10;
      doc.setFontSize(12);
      formData.experience.forEach(exp => {
        doc.text(`${exp.company} - ${exp.position}`, 20, yPos);
        yPos += 7;
        doc.text(exp.duration, 20, yPos);
        yPos += 7;
        const expLines = doc.splitTextToSize(exp.description, pageWidth - 40);
        doc.text(expLines, 20, yPos);
        yPos += (expLines.length * 7) + 5;
      });
      yPos += 5;
      addLineBreak();
    }

   
    // Insights section
    if (formData.insights.length > 0) {
      doc.setFontSize(16);
      doc.text('Insights', 20, yPos);
      yPos += 10;
      doc.setFontSize(12);
      formData.insights.forEach(insight => {
        doc.text(insight.category, 20, yPos);
        yPos += 7;
        const insightLines = doc.splitTextToSize(insight.description, pageWidth - 40);
        doc.text(insightLines, 20, yPos);
        yPos += (insightLines.length * 7) + 5;
      });
    }
   

    doc.save('cv.pdf');
  };

  return (
    <div className="p-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full md:w-auto">Generate CV</Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Create Your CV</DialogTitle>
          </DialogHeader>

          {!showPreview ? (
            <div className="flex-1 overflow-y-auto pr-4 space-y-6">
              {/* Header Section */}
              <div className="flex gap-6 items-start">
                <img 
                  src={formData.imageUrl} 
                  alt="Profile" 
                  className="w-32 h-32 rounded-full object-cover"
                />
                <div className="flex-1 space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      disabled
                      className="bg-gray-100"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        disabled
                        className="bg-gray-100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        disabled
                        className="bg-gray-100"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px bg-gray-200" />

              {/* Profile Section */}
              <div>
                <Label htmlFor="profile">Profile</Label>
                <Textarea
                  id="profile"
                  value={formData.profile}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    profile: e.target.value
                  }))}
                  placeholder="Write a brief professional summary..."
                  className="h-32"
                />
              </div>

              <div className="h-px bg-gray-200" />

              {/* Skills Section */}
              <div>
                <Label>Skills</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    placeholder="Add a skill"
                  />
                  <Button onClick={addSkill} size="icon">
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <div 
                      key={index}
                      className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full flex items-center gap-2"
                    >
                      {skill}
                      <button onClick={() => removeSkill(index)} className="hover:text-destructive">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gray-200" />

              {/* Education Section */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Education</Label>
                  <Button onClick={addEducation} variant="outline" size="sm">
                    Add Education
                  </Button>
                </div>
                <div className="space-y-4">
                  {formData.education.map((edu, index) => (
                    <div key={index} className="grid gap-2 p-4 border rounded-lg relative">
                        <button 
                        onClick={() => removeEducation(index)}
                        className='absolute top-2 right-2 text-red-500 hover:text-red-700'>
                            <Trash2 className='h-4 w-4' />
                        </button>
                      <Input
                        placeholder="Institution"
                        value={edu.institution}
                        onChange={(e) => {
                          const newEducation = [...formData.education];
                          newEducation[index].institution = e.target.value;
                          setFormData(prev => ({ ...prev, education: newEducation }));
                        }}
                      />
                      <Input
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => {
                          const newEducation = [...formData.education];
                          newEducation[index].degree = e.target.value;
                          setFormData(prev => ({ ...prev, education: newEducation }));
                        }}
                      />
                      <Input
                        placeholder="Year"
                        value={edu.year}
                        onChange={(e) => {
                          const newEducation = [...formData.education];
                          newEducation[index].year = e.target.value;
                          setFormData(prev => ({ ...prev, education: newEducation }));
                        }}
                      />
                      <Textarea
                        placeholder="Description"
                        value={edu.description}
                        onChange={(e) => {
                          const newEducation = [...formData.education];
                          newEducation[index].description = e.target.value;
                          setFormData(prev => ({ ...prev, education: newEducation }));
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gray-200" />

              {/* Experience Section */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Experience</Label>
                  <Button onClick={addExperience} variant="outline" size="sm">
                    Add Experience
                  </Button>
                </div>
                <div className="space-y-4">
                  {formData.experience.map((exp, index) => (
                    <div key={index} className="grid gap-2 p-4 border rounded-lg relative">
                        <button 
                        onClick={() => removeExperience(index)}
                        className='absolute top-2 right-2 text-red-500 hover:text-red-700'>
                            <Trash2 className='h-4 w-4' />
                        </button>

                      <Input
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => {
                          const newExperience = [...formData.experience];
                          newExperience[index].company = e.target.value;
                          setFormData(prev => ({ ...prev, experience: newExperience }));
                        }}
                      />
                      <Input
                        placeholder="Position"
                        value={exp.position}
                        onChange={(e) => {
                          const newExperience = [...formData.experience];
                          newExperience[index].position = e.target.value;
                          setFormData(prev => ({ ...prev, experience: newExperience }));
                        }}
                      />
                      <Input
                        placeholder="Duration"
                        value={exp.duration}
                        onChange={(e) => {
                          const newExperience = [...formData.experience];
                          newExperience[index].duration = e.target.value;
                          setFormData(prev => ({ ...prev, experience: newExperience }));
                        }}
                      />
                      <Textarea
                        placeholder="Description"
                        value={exp.description}
                        onChange={(e) => {
                          const newExperience = [...formData.experience];
                          newExperience[index].description = e.target.value;
                          setFormData(prev => ({ ...prev, experience: newExperience }));
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-gray-200" />

              {/* Insights Section */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Insights</Label>
                  <Button onClick={addInsight} variant="outline" size="sm">
                    Add Insight
                  </Button>
                </div>
                <div className="space-y-4">
                  {formData.insights.map((insight, index) => (
                    <div key={index} className="grid gap-2 p-4 border rounded-lg relative">
                        <button 
                        onClick={()=> removeInsight(index)}
                        className='absolute top-2 right-2 text-red-500 hover:text-red-700'>
                            <Trash2 className='h-4 w-4' />
                        </button>
                      <Input
                        placeholder="Category (e.g., Hobbies, Interests)"
                        value={insight.category}
                        onChange={(e) => {
                          const newInsights = [...formData.insights];
                          newInsights[index].category = e.target.value;
                          setFormData(prev => ({ ...prev, insights: newInsights }));
                        }}
                      />
                      <Textarea
                       placeholder="Description"
                       value={insight.description}
                       onChange={(e) => {
                         const newInsights = [...formData.insights];
                         newInsights[index].description = e.target.value;
                         setFormData(prev => ({ ...prev, insights: newInsights }));
                       }}
                     />
                   </div>
                 ))}
               </div>
             </div>
           </div>
         ) : (
           // CV Preview
           <div className="bg-white flex-1 overflow-y-auto p-6 rounded-lg shadow space-y-6">
             {/* Header Section */}
             <div className="flex items-start gap-6">
               <img 
                 src={formData.imageUrl} 
                 alt="Profile" 
                 className="w-32 h-32 rounded-full object-cover"
               />
               <div>
                 <h2 className="text-2xl font-bold">{formData.fullName}</h2>
                 <p className="text-gray-600">{formData.email}</p>
                 <p className="text-gray-600">{formData.phone}</p>
               </div>
             </div>

             <div className="h-px bg-gray-200" />

             {/* Profile Section */}
             <div>
               <h3 className="text-lg font-semibold mb-2">Profile</h3>
               <p className="text-gray-700 whitespace-pre-wrap">{formData.profile}</p>
             </div>

             <div className="h-px bg-gray-200" />

             {/* Skills Section */}
             <div>
               <h3 className="text-lg font-semibold mb-2">Skills</h3>
               <div className="flex flex-wrap gap-2">
                 {formData.skills.map((skill, index) => (
                   <span 
                     key={index}
                     className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full"
                   >
                     {skill}
                   </span>
                 ))}
               </div>
             </div>

             <div className="h-px bg-gray-200" />

             {/* Education Section */}
             <div>
               <h3 className="text-lg font-semibold mb-2">Education</h3>
               <div className="space-y-4">
                 {formData.education.map((edu, index) => (
                   <div key={index} className="space-y-1">
                     <p className="font-medium">{edu.institution}</p>
                     <p className="text-gray-700">{edu.degree}</p>
                     <p className="text-gray-600">{edu.year}</p>
                     <p className="text-gray-600">{edu.description}</p>
                   </div>
                 ))}
               </div>
             </div>

             <div className="h-px bg-gray-200" />

             {/* Experience Section */}
             {formData.experience.length > 0 && (
               <>
                 <div>
                   <h3 className="text-lg font-semibold mb-2">Experience</h3>
                   <div className="space-y-4">
                     {formData.experience.map((exp, index) => (
                       <div key={index} className="space-y-1">
                         <p className="font-medium">{exp.company}</p>
                         <p className="text-gray-700">{exp.position}</p>
                         <p className="text-gray-600">{exp.duration}</p>
                         <p className="text-gray-600">{exp.description}</p>
                       </div>
                     ))}
                   </div>
                 </div>
                 <div className="h-px bg-gray-200" />
               </>
             )}

             {/* Insights Section */}
             {formData.insights.length > 0 && (
               <div>
                 <h3 className="text-lg font-semibold mb-2">Insights</h3>
                 <div className="space-y-4">
                   {formData.insights.map((insight, index) => (
                     <div key={index} className="space-y-1">
                       <p className="font-medium">{insight.category}</p>
                       <p className="text-gray-600">{insight.description}</p>
                     </div>
                   ))}
                 </div>
               </div>
             )}
           </div>
         )}

         <DialogFooter className='flex-shrink-0 mt-4'>
           {!showPreview ? (
             <>
               <Button variant="outline" onClick={() => setShowPreview(false)}>
                 Cancel
               </Button>
               <Button onClick={() => setShowPreview(true)}>Preview</Button>
             </>
           ) : (
             <>
               <Button variant="outline" onClick={() => setShowPreview(false)}>
                 Edit
               </Button>
               <Button onClick={generatePDF}>Download PDF</Button>
             </>
           )}
         </DialogFooter>
       </DialogContent>
     </Dialog>
   </div>
 );
};

export default CVGenerator;