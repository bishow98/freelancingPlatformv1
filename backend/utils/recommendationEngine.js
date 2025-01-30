class RecommedationEngine {
    //convert skills array to vetctors form of 0 or 1 accoriding to their skills set in the job description 
    createSkillVector(skills, allSkills){
        //create binary vector (1 if skills exists , 0 if not)
        return allSkills.map(skill=>skills.some(s=>s.toLowerCase()=== skill.toLowerCase()) ? 1 : 0);
    }



//caculate vector magnitude 
calculateMagnitude(vector){
    return Math.sqrt(vector.reduce((sum,val)=> sum + val*val, 0));
}

//calculate the dot product of two vectors
calculateDotProduct(vector1, vector2){
    return vector1.reduce((sum,val,i)=> sum + val*vector2[i],0);
}

//calculate cosine similarity between two vectors 
calculateCosineSimilarity(vector1, vector2){
    const dotProduct = this.calculateDotProduct(vector1, vector2);
    const magnitude1 = this.calculateMagnitude(vector1);
    const magnitude2 = this.calculateMagnitude(vector2);


//avoid the division by zero error kaile kai ta divide by zero pani huna sakxa 
    if(magnitude1 === 0 || magnitude2 === 0) return 0 ;

    return dotProduct / (magnitude1 * magnitude2);
}


//get recommended jobs based on freelancer skills 
getRecommendedJobs(freelancerSkills, jobs, allSkills) {
    const freelancerVector = this.createSkillVector(freelancerSkills,allSkills);

    return jobs.map(job => {
        const jobVector = this.createSkillVector(job.requirements, allSkills);
        const similarity = this.calculateCosineSimilarity(freelancerVector, jobVector);
    

    return {
        ...job.toObject(),
        similarityScore: similarity,
        matchPercentage: Math.round(similarity * 100)
    };

}).sort((a,b)=> b.similarityScore - a.similarityScore);
}
}




export default new RecommedationEngine();