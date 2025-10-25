document.addEventListener('DOMContentLoaded', () => {
  // Set active nav link based on current filename
  const navLinks = document.querySelectorAll('.nav-links a');
  const current = (location.pathname || 'index.html').split('/').pop() || 'index.html';
  navLinks.forEach(a => {
    const href = (a.getAttribute('href') || '').split('/').pop();
    if (href === current) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });

  // If E-Content page present, initialize video library
  if (document.getElementById('videosContainer')) {
    // Video database: for broad coverage we'll link to curated YouTube searches for each class/subject.
    // This approach keeps the dataset relevant and avoids hard-coding many single-video IDs.
    const videoDatabase = [];

    const classes = Array.from({length:12}, (_,i)=>String(i+1));
    const subjects = ['Mathematics','Science','Physics','Chemistry','Biology','English','Hindi','Social Science','History','Geography','Economics','Political Science'];

    // Populate a card per class+subject that links to YouTube search results for that topic
    classes.forEach(cls => {
      subjects.forEach(subj => {
        const query = encodeURIComponent(`class ${cls} ${subj} lecture`);
        videoDatabase.push({
          class: cls,
          subject: subj,
          title: `${subj} - Class ${cls} (YouTube results)`,
          url: `https://www.youtube.com/results?search_query=${query}`,
          description: `Search results on YouTube for Class ${cls} ${subj} lectures.`
        });
      });
    });

    // Add curated direct video links (high-quality educational content)
    videoDatabase.push({class:'11', subject:'Physics', title:"Newton's Laws of Motion", url:'https://www.youtube.com/watch?v=fo_pmp5rtzo', description:'Comprehensive explanation of Newton\'s three laws of motion with real-life examples.'});
    videoDatabase.push({class:'10', subject:'Physics', title:'Light Reflection and Refraction', url:'https://www.youtube.com/watch?v=JGrKNHGHJnE', description:'Understanding the principles of light, reflection, and refraction with practical demonstrations.'});
    videoDatabase.push({class:'11', subject:'Chemistry', title:'The Periodic Table Explained', url:'https://www.youtube.com/watch?v=rz4Dd1I_fX0', description:'Learn about the organization and patterns in the periodic table of elements.'});
    videoDatabase.push({class:'12', subject:'Chemistry', title:'Introduction to Organic Chemistry', url:'https://www.youtube.com/watch?v=VhjoQgqN3R0', description:'Basic concepts of organic chemistry and carbon compounds explained simply.'});
    videoDatabase.push({class:'12', subject:'Mathematics', title:'Integration Techniques', url:'https://www.youtube.com/watch?v=rfG8ce4nNh0', description:'Master different methods of integration with solved examples.'});
    videoDatabase.push({class:'10', subject:'Mathematics', title:'Trigonometry Fundamentals', url:'https://www.youtube.com/watch?v=K7gvnKNBtNQ', description:'Basic concepts of trigonometry including ratios, angles, and identities.'});
    videoDatabase.push({class:'9', subject:'Biology', title:'Cell Structure and Functions', url:'https://www.youtube.com/watch?v=8IlzKri08kk', description:'Detailed explanation of cell organelles and their roles in living organisms.'});
    videoDatabase.push({class:'10', subject:'Biology', title:'Human Body Systems', url:'https://www.youtube.com/watch?v=URUJD5NEXC8', description:'Overview of major organ systems in the human body and their functions.'});
    videoDatabase.push({class:'11', subject:'Chemistry', title:'Chemical Bonding', url:'https://www.youtube.com/watch?v=LkAykOv1foc', description:'Understanding different types of chemical bonds and their formation.'});
    videoDatabase.push({class:'12', subject:'Mathematics', title:'Differential Equations', url:'https://www.youtube.com/watch?v=xf-3ATzFyKA', description:'Learn to solve different types of differential equations step by step.'});

    // Add curated VidyaWise entries (open YouTube search restricted by channel name + class + subject)
    const vidyaChannel = 'vidyawiseofficial';
    const vidyaCurated = [
      {class:'1', subject:'Mathematics'},
      {class:'1', subject:'English'},
      {class:'6', subject:'Mathematics'},
      {class:'6', subject:'Science'},
      {class:'9', subject:'Mathematics'},
      {class:'9', subject:'Science'},
      {class:'10', subject:'Mathematics'},
      {class:'10', subject:'Science'},
      {class:'11', subject:'Physics'},
      {class:'11', subject:'Chemistry'},
      {class:'12', subject:'Physics'},
      {class:'12', subject:'Chemistry'}
    ];
    vidyaCurated.forEach(item => {
      const q = encodeURIComponent(vidyaChannel + ' ' + 'class ' + item.class + ' ' + item.subject + ' lecture');
      videoDatabase.push({
        class: item.class,
        subject: item.subject,
        title: `${item.subject} - Class ${item.class} (Vidyawise)` ,
        url: `https://www.youtube.com/results?search_query=${q}`,
        description: `Vidyawise channel search results for Class ${item.class} ${item.subject} lectures.`
      });
    });

    // Add explicit VidyaWise playlist links for Class 11 & 12 Maths (real playlists found on the channel)
    videoDatabase.push({
      class: '11',
      subject: 'Mathematics',
      title: 'Class 11 Maths - Complete NCERT One Shot Series (Vidyawise Playlist)',
      url: 'https://www.youtube.com/playlist?list=PLr6TOxpiWwuHWGkUBJF2w_knZEGsRgAG_',
      description: 'Vidyawise - Class 11 Maths complete NCERT one shot playlist.'
    });

    videoDatabase.push({
      class: '12',
      subject: 'Mathematics',
      title: 'Class 12 Maths - One Shot Series (Vidyawise Playlist)',
      url: 'https://www.youtube.com/playlist?list=PLr6TOxpiWwuFjwENCIeN9O3kZ691QqkxD',
      description: 'Vidyawise - Class 12 Maths one shot series playlist.'
    });

    videoDatabase.push({
      class: '12',
      subject: 'Mathematics',
      title: 'Class 12 Maths - SUPER SHOT Playlist (Vidyawise)',
      url: 'https://www.youtube.com/playlist?list=PLr6TOxpiWwuGpoikDxEILW96RYwwN52Fj',
      description: 'Vidyawise - Class 12 MATHS SUPER SHOT playlist.'
    });

    // If VidyaWise has fewer direct Class 9/10 playlists, link to channel-scoped search results to surface VidyaWise videos for those classes
    videoDatabase.push({
      class: '10',
      subject: 'Mathematics',
      title: 'Class 10 Maths (Vidyawise Videos)',
      url: 'https://www.youtube.com/results?search_query=vidyawiseofficial+class+10+maths',
      description: 'Search results on VidyaWise channel for Class 10 Maths lectures.'
    });

    videoDatabase.push({
      class: '9',
      subject: 'Mathematics',
      title: 'Class 9 Maths (Vidyawise Videos)',
      url: 'https://www.youtube.com/results?search_query=vidyawiseofficial+class+9+maths',
      description: 'Search results on VidyaWise channel for Class 9 Maths lectures.'
    });

    const videosContainer = document.getElementById('videosContainer');
    const noResults = document.getElementById('noResults');
    const classFilter = document.getElementById('classFilter');
    const subjectFilter = document.getElementById('subjectFilter');
    const searchInput = document.getElementById('searchInput');

    function renderVideos(list) {
      videosContainer.innerHTML = '';
      if (!list.length) {
        noResults.style.display = 'block';
        return;
      }
      noResults.style.display = 'none';
      list.forEach(v => {
        const card = document.createElement('div');
        card.className = 'video-card';
        const portalUrl = v.url;
        card.innerHTML = `
          <div class="video-thumbnail" style="display:flex;align-items:center;justify-content:center;background:linear-gradient(90deg,rgba(37,99,235,0.06),rgba(8,145,178,0.04));height:180px;">
            <div style="font-size:2rem;color:var(--primary);">▶</div>
          </div>
          <div class="video-info">
            <h3>${escapeHtml(v.title)}</h3>
            <div class="video-meta">
              <span class="badge">Class ${escapeHtml(v.class)}</span>
              <span class="badge">${escapeHtml(v.subject)}</span>
            </div>
            <p style="margin-top:0.75rem;color:var(--text-light);">${escapeHtml(v.description)}</p>
            <div style="margin-top:0.75rem;display:flex;gap:0.5rem;align-items:center;">
              <a class="btn" href="${portalUrl}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">Open link</a>
            </div>
          </div>
        `;
        // make the whole card open the portal when clicked
        card.addEventListener('click', () => {
          window.open(portalUrl, '_blank', 'noopener');
        });
        videosContainer.appendChild(card);
      });
    }

    function escapeHtml(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    // Filtering logic
    window.filterVideos = function() {
      const cls = classFilter.value;
      const subj = subjectFilter.value.toLowerCase();
      const q = searchInput.value.trim().toLowerCase();

      const filtered = videoDatabase.filter(v => {
        if (cls && String(v.class) !== String(cls)) return false;
        if (subj && v.subject.toLowerCase() !== subj) return false;
        if (q) {
          return (v.title + ' ' + v.description + ' ' + v.subject).toLowerCase().includes(q);
        }
        return true;
      });

      renderVideos(filtered);
    };

    // Initial render
    renderVideos(videoDatabase);
  }
});
