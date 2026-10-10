/* Texas quote form: EmailJS (same service/template as the home page), honeypot, timing + engagement check, visible status. */
(function(){
  var KEY = 'alWutsHLG6c3h9P2j', SVC = 'service_usimtub', TPL = 'template_5n0cskt', PHONE = '1-888-779-2284';
  var loadedAt = Date.now();
  var m = document.querySelector('.menu-btn'), nav = document.getElementById('mnav');
  if (m && nav) m.addEventListener('click', function(){ var o = m.getAttribute('aria-expanded') === 'true'; m.setAttribute('aria-expanded', o ? 'false' : 'true'); nav.hidden = o; });
  var forms = document.querySelectorAll('form.txq');
  if (!forms.length) return;
  var ready = false;
  function init(){ if (!ready && window.emailjs) { window.emailjs.init({ publicKey: KEY }); ready = true; } return ready; }
  forms.forEach(function(form){
    var engaged = false, st = form.querySelector('.status'), btn = form.querySelector('button[type=submit]'), label = btn.textContent;
    ['keydown','pointerdown','input'].forEach(function(ev){ form.addEventListener(ev, function(){ engaged = true; }, {passive:true}); });
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var n = form.elements.user_name, p = form.elements.user_phone, z = form.elements.user_zip, em = form.elements.user_email;
      [n,p,z,em].forEach(function(i){ i.classList.remove('bad'); i.removeAttribute('aria-invalid'); });
      var bad = [];
      if (n.value.trim().length < 2) bad.push(n);
      if (p.value.replace(/\D/g,'').length < 10) bad.push(p);
      if (!/^\d{5}(-\d{4})?$/.test(z.value.trim())) bad.push(z);
      if (em.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.value.trim())) bad.push(em);
      if (bad.length){ bad.forEach(function(i){ i.classList.add('bad'); i.setAttribute('aria-invalid','true'); }); bad[0].focus(); st.className = 'status err'; st.textContent = 'Please check your name, a 10-digit phone number and a 5-digit ZIP code.'; return; }
      if (form.elements.hp_company && form.elements.hp_company.value) return;
      if (Date.now() - loadedAt < 3500){ st.className = 'status err'; st.textContent = 'Please wait a moment and press send again.'; return; }
      if (!engaged) return;
      if (!init()){ st.className = 'status err'; st.textContent = 'The form could not load. Please call ' + PHONE + '.'; return; }
      btn.disabled = true; btn.textContent = 'Sending...'; st.className = 'status'; st.textContent = '';
      window.emailjs.sendForm(SVC, TPL, form).then(function(){
        form.reset(); st.className = 'status ok'; st.textContent = 'Thank you. Your request was sent and a specialist will call you. Need help sooner? Call ' + PHONE + '.';
      }).catch(function(){
        st.className = 'status err'; st.textContent = 'Your request did not go through. Please try again or call ' + PHONE + '.';
      }).then(function(){ btn.disabled = false; btn.textContent = label; });
    });
  });
})();
