from io import BytesIO
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    HRFlowable,
    PageBreak
)
from reportlab.graphics.shapes import Drawing, Rect, Circle, String, Group

def draw_luxury_border(canvas, doc):
    """Draws a premium double-line certificate frame border with gold accents."""
    canvas.saveState()
    NAVY = colors.HexColor("#0A192F")
    GOLD = colors.HexColor("#C5A059")
    width, height = doc.pagesize
    margin = 20
    
    # Outer Deep Navy Frame
    canvas.setStrokeColor(NAVY)
    canvas.setLineWidth(2)
    canvas.rect(margin, margin, width - (2 * margin), height - (2 * margin))
    
    # Inner Fine Gold Accent Frame
    canvas.setStrokeColor(GOLD)
    canvas.setLineWidth(0.75)
    canvas.rect(margin + 4, margin + 4, width - (2 * (margin + 4)), height - (2 * (margin + 4)))
    canvas.restoreState()

def create_progress_bar(percentage, fill_color, bg_color=colors.HexColor("#EEEEEE")):
    """Generates a native high-resolution vector progress bar flowable."""
    d = Drawing(120, 10)
    d.add(Rect(0, 2, 120, 6, rx=3, ry=3, fillColor=bg_color, strokeColor=None))
    fill_width = max(0, min(120, (percentage / 100.0) * 120))
    if fill_width > 0:
        d.add(Rect(0, 2, fill_width, 6, rx=3, ry=3, fillColor=fill_color, strokeColor=None))
    return d

def create_star_rating(rating, max_stars=5):
    """Generates visual stars for difficulty/demand scores using shapes."""
    d = Drawing(70, 12)
    GOLD = colors.HexColor("#C5A059")
    GREY = colors.HexColor("#E0E0E0")
    for i in range(max_stars):
        char = "★" if i < rating else "☆"
        color = GOLD if i < rating else GREY
        d.add(String(i * 13, 1, char, fontName="Helvetica", fontSize=14, fillColor=color))
    return d

def _convert_to_list_items(data):
    if not data: return ["Not Available"]
    if isinstance(data, list):
        return [str(item["name"] if isinstance(item, dict) and "name" in item else item) for item in data]
    return [str(data)]

def generate_career_report(report_data):
    buffer = BytesIO()
    document = SimpleDocTemplate(
        buffer, rightMargin=40, leftMargin=40, topMargin=40, bottomMargin=40
    )

    # --- BRAND LUXURY PALETTE ---
    PREMIUM_NAVY = colors.HexColor("#0A192F")
    RICH_GOLD = colors.HexColor("#C5A059")
    LIGHT_GOLD_BG = colors.HexColor("#FDFBF7")
    TEXT_CHARCOAL = colors.HexColor("#222222")
    TEXT_MUTED = colors.HexColor("#666666")
    SUCCESS_GREEN = colors.HexColor("#1B4D3E")
    ALERT_RED = colors.HexColor("#7C1C1C")
    WHITE = colors.HexColor("#FFFFFF")

    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle('CertT', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=24, leading=28, textColor=PREMIUM_NAVY, alignment=TA_CENTER)
    subtitle_style = ParagraphStyle('CertSub', parent=styles['Normal'], fontName='Helvetica', fontSize=10, leading=14, textColor=RICH_GOLD, alignment=TA_CENTER)
    section_heading = ParagraphStyle('LuxHead', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=13, leading=16, textColor=PREMIUM_NAVY, spaceAfter=6)
    blueprint_heading = ParagraphStyle('BlueHead', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=16, leading=20, textColor=PREMIUM_NAVY, spaceAfter=4)
    body_text = ParagraphStyle('LuxBody', parent=styles['Normal'], fontName='Helvetica', fontSize=9.5, leading=14, textColor=TEXT_CHARCOAL)
    body_white = ParagraphStyle('LuxBodyW', parent=body_text, textColor=WHITE)
    list_item_style = ParagraphStyle('LuxList', parent=body_text, leftIndent=12, firstLineIndent=-10, spaceAfter=4)

    story = []

    # ==========================================
    # PAGE 1: EXECUTIVE OVERVIEW & MARKET DATA
    # ==========================================
    story.append(Paragraph("<b>EDUVISION AI CAREER GUIDANCE PLATFORM</b>", ParagraphStyle('TopB', parent=subtitle_style, fontSize=8, spaceAfter=12)))
    story.append(Paragraph("CAREER GUIDANCE REPORT", title_style))
    story.append(Paragraph("YOUR PERSONALIZED AI-POWERED CAREER ROADMAP", subtitle_style))
    story.append(Spacer(1, 15))
    story.append(HRFlowable(width="100%", thickness=1, color=RICH_GOLD, spaceAfter=15))

    # Metric Row
    career = report_data.get("predicted_career", "Data Scientist")
    match_pct = f'{report_data.get("match_percentage", "92")}%'
    gen_date = report_data.get("generated_date", "27 June 2026")

    kpi_table = Table([[
        Paragraph(f"<font size=8 color='{RICH_GOLD.hexval()}'><b>PREDICTED CAREER</b></font><br/><font size=14 color='{PREMIUM_NAVY.hexval()}'><b>{career}</b></font>", body_text),
        Paragraph(f"<font size=8 color='{RICH_GOLD.hexval()}'><b>MATCH RATING</b></font><br/><font size=15 color='{PREMIUM_NAVY.hexval()}'><b>{match_pct}</b></font><br/><font size=7.5 color='green'>Excellent Match</font>", body_text),
        Paragraph(f"<font size=8 color='{RICH_GOLD.hexval()}'><b>ISSUED ON</b></font><br/><font size=11><b>{gen_date}</b></font>", body_text)
    ]], colWidths=[175, 170, 175])
    kpi_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), LIGHT_GOLD_BG), ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'), ('TOPPADDING', (0, 0), (-1, -1), 12),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 12), ('BOX', (0, 0), (-1, -1), 1, RICH_GOLD),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#E5D3B3"))
    ]))
    story.append(kpi_table)
    story.append(Spacer(1, 15))

    # Core Overview Split Box
    overview_content = [
        Paragraph("<b>CAREER OVERVIEW</b>", ParagraphStyle('WH', parent=section_heading, textColor=WHITE)),
        Spacer(1, 6),
        Paragraph("Executive Summary", ParagraphStyle('WS', parent=body_text, fontName='Helvetica-Bold', textColor=RICH_GOLD)),
        Paragraph(str(report_data.get("career_explanation", "Not Available")), body_white),
        Spacer(1, 10),
        Paragraph("Future Outlook & Scope", ParagraphStyle('WS', parent=body_text, fontName='Helvetica-Bold', textColor=RICH_GOLD)),
        Paragraph(str(report_data.get("future_scope", "Not Available")), body_white),
    ]

    req_skills_p = [Paragraph(f"<font color='{RICH_GOLD.hexval()}'>&#x25C6;</font> {s}", list_item_style) for s in _convert_to_list_items(report_data.get("required_skills"))]
    skill_gaps_p = [Paragraph(f"<font color='{ALERT_RED.hexval()}'>&#x25C6;</font> {g}", list_item_style) for g in _convert_to_list_items(report_data.get("skill_gaps"))]
    skills_content = [
        Paragraph("<b>SKILLS ANALYSIS</b>", section_heading),
        HRFlowable(width="100%", thickness=0.5, color=RICH_GOLD, spaceAfter=6),
        Table([[Paragraph("<b>Acquired Competencies</b>", ParagraphStyle('G', parent=body_text, fontName='Helvetica-Bold', textColor=SUCCESS_GREEN)), 
                 Paragraph("<b>Development Gaps</b>", ParagraphStyle('R', parent=body_text, fontName='Helvetica-Bold', textColor=ALERT_RED))],
                [req_skills_p, skill_gaps_p]], colWidths=[120, 120])
    ]

    row1_table = Table([[overview_content, skills_content]], colWidths=[250, 270])
    row1_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, 0), PREMIUM_NAVY), ('BACKGROUND', (1, 0), (1, 0), WHITE),
        ('BOX', (1, 0), (1, 0), 1, RICH_GOLD), ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 12), ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
        ('LEFTPADDING', (0, 0), (-1, -1), 12), ('RIGHTPADDING', (0, 0), (-1, -1), 12)
    ]))
    story.append(row1_table)
    story.append(Spacer(1, 15))

    # Market Opportunities Matrix
    job_roles = [Paragraph(f"&#x2022; {i}", list_item_style) for i in _convert_to_list_items(report_data.get("job_roles"))]
    rel_careers = [Paragraph(f"&#x2022; {i}", list_item_style) for i in _convert_to_list_items(report_data.get("related_careers"))]
    certs = [Paragraph(f"&#x2022; {i}", list_item_style) for i in _convert_to_list_items(report_data.get("certifications"))]
    studies = [Paragraph(f"&#x2022; {i}", list_item_style) for i in _convert_to_list_items(report_data.get("higher_studies"))]

    path_table = Table([
        [Paragraph("<b>Top Job Roles</b>", ParagraphStyle('H1', parent=body_text, fontName='Helvetica-Bold', textColor=PREMIUM_NAVY)), 
         Paragraph("<b>Related Careers</b>", ParagraphStyle('H2', parent=body_text, fontName='Helvetica-Bold', textColor=PREMIUM_NAVY)), 
         Paragraph("<b>Certifications</b>", ParagraphStyle('H3', parent=body_text, fontName='Helvetica-Bold', textColor=PREMIUM_NAVY)), 
         Paragraph("<b>Higher Studies</b>", ParagraphStyle('H4', parent=body_text, fontName='Helvetica-Bold', textColor=PREMIUM_NAVY))],
        [job_roles, rel_careers, certs, studies]
    ], colWidths=[130, 130, 130, 130])
    path_table.setStyle(TableStyle([
        ('BOX', (0, 0), (-1, -1), 1, RICH_GOLD), ('BACKGROUND', (0, 0), (-1, 0), LIGHT_GOLD_BG),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'), ('TOPPADDING', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 10), ('LEFTPADDING', (0, 0), (-1, -1), 8), ('RIGHTPADDING', (0, 0), (-1, -1), 8)
    ]))
    story.append(Paragraph("<b>CAREER PATH & MARKET OPPORTUNITIES</b>", section_heading))
    story.append(path_table)
    story.append(Spacer(1, 15))

    # Academic Channels
    ind_colleges = [Paragraph(f"&#x2022; {i}", list_item_style) for i in _convert_to_list_items(report_data.get("colleges_india"))]
    int_univs = [Paragraph(f"&#x2022; {i}", list_item_style) for i in _convert_to_list_items(report_data.get("universities_abroad"))]
    
    edu_table = Table([
        [Paragraph("<b>Top Colleges in India</b>", ParagraphStyle('E1', parent=body_text, fontName='Helvetica-Bold', textColor=PREMIUM_NAVY)),
         Paragraph("<b>Top Universities Abroad</b>", ParagraphStyle('E2', parent=body_text, fontName='Helvetica-Bold', textColor=PREMIUM_NAVY))],
        [ind_colleges, int_univs]
    ], colWidths=[260, 260])
    edu_table.setStyle(TableStyle([
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#EBF0F6")), ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('TOPPADDING', (0, 0), (-1, -1), 8), ('BOTTOMPADDING', (0, 0), (-1, -1), 8)
    ]))
    story.append(Paragraph("<b>RECOMMENDED TARGET INSTITUTIONS</b>", section_heading))
    story.append(edu_table)
    
    # Force blueprint cleanly onto its own dedicated premium page layout
    story.append(PageBreak())

    # ==========================================
    # PAGE 2: AI CAREER SUCCESS BLUEPRINT
    # ==========================================
    story.append(Paragraph("🚀 AI Career Success Blueprint", blueprint_heading))
    story.append(Paragraph(f"A personalized roadmap generated by EduVision AI to help you become a successful <b>{career}</b>.", ParagraphStyle('SubB', parent=body_text, textColor=TEXT_MUTED, spaceAfter=15)))
    
    # DYNAMIC BLUEPRINT BRANCHING (Personalization Engine)
    normalized_career = career.lower()
    
    if "cloud" in normalized_career:
        # Cloud Architecture Roadmap Branch
        phases_data = [
            ("Phase 1 — Linux & Core Networking Fundamentals", "Month 1", "Master bash scripting, SSH, routing protocols, and systems administration.", "✔ Bash Basics\n✔ TCP/IP\n✔ DNS/Firewalls", "Homelab Network Configuration"),
            ("Phase 2 — AWS Cloud Platform Core", "Month 2-3", "Implement scalable computing infrastructure, IAM rules, and serverless architectures.", "✔ EC2 & VPC\n✔ IAM Security\n✔ S3 Storage", "Highly Available Web Infrastructure"),
            ("Phase 3 — Containerization & DevOps Systems", "Month 4", "Build orchestrated pipelines using contemporary deployment tooling.", "✔ Docker\n✔ Kubernetes\n✔ CI/CD Systems", "Automated Microservices Deployment Hub"),
            ("Phase 4 — Infrastructure as Code Architecture", "Month 5", "Provision complete distributed clouds programmatically.", "✔ Terraform\n✔ Ansible Config", "Multi-Region Enterprise Cloud Architecture"),
            ("Phase 5 — Advanced Certifications", "Month 6", "AWS Certified Solutions Architect Professional / Azure DevOps Engineer", "Recommended Tracks", "Complete Multi-Tier Mock Exam Validation"),
            ("Phase 6 — Strategic Cloud Internship", "Target Firms", "Google, AWS, Azure Teams, HashiCorp, Red Hat, Cloudflare", "Global Operations", "Production Support Engineering Rotation"),
            ("Phase 7 — Targeted Career Goal Path", "Growth Track", "Junior Cloud Engineer  ➔  DevOps Specialist  ➔  Cloud Architect  ➔  Principal Systems Engineer", "Milestone Vector", "Cross-Platform Infrastructure Authority")
        ]
        salary_timeline = [("Fresh Graduate", "₹5–9 LPA"), ("2 Years Exp", "₹9–15 LPA"), ("5 Years Exp", "₹18–32 LPA"), ("10 Years Exp", "₹38–65 LPA")]
    elif "cyber" in normalized_career or "security" in normalized_career:
        # Cyber Security Analyst Roadmap Branch
        phases_data = [
            ("Phase 1 — Networks & Security Operations", "Month 1", "Configure defense parameters, examine packet captures, and evaluate system vulnerabilities.", "✔ Wireshark\n✔ Port Scanning\n✔ Linux Administration", "Secure Corporate Intranet Blueprint"),
            ("Phase 2 — Ethical Hacking & Penetration Testing", "Month 2-3", "Examine infrastructure perimeter exploits and application security layers safely.", "✔ Metasploit\n✔ OWASP Top 10", "Authorized Corporate Network Penetration Assessment"),
            ("Phase 3 — Incident Response & Threat Hunting", "Month 4", "Analyze log aggregates and set up intrusion detection architectures.", "✔ SIEM Tooling\n✔ Splunk Core", "SIEM Infrastructure Incident Isolation Project"),
            ("Phase 4 — Enterprise GRC Architecture", "Month 5", "Establish operational compliance with major global protection frameworks.", "✔ ISO 27001\n✔ SOC2 Auditing", "Complete Compliance Framework Audit Report"),
            ("Phase 5 — High-Impact Certifications", "Month 6", "CEH (Certified Ethical Hacker) / CompTIA Security+ / CISSP Credentials", "Industry Standards", "Comprehensive Red Team Simulation Clearances"),
            ("Phase 6 — Security Operations Internship", "Target Firms", "CrowdStrike, Palo Alto Networks, FireEye, Cisco Security, Major Financials", "SOC Centers", "Junior Threat Detection Center Placement"),
            ("Phase 7 — Cyber Security Career Goal Path", "Growth Track", "SOC Analyst  ➔  Penetration Tester  ➔  Incident Responder  ➔  CISO Specialist", "Milestone Vector", "Principal Threat Architect Officer")
        ]
        salary_timeline = [("Fresh Graduate", "₹5.5–9.5 LPA"), ("2 Years Exp", "₹10–16 LPA"), ("5 Years Exp", "₹19–34 LPA"), ("10 Years Exp", "₹40–75 LPA")]
    else:
        # Default / Requested Data Scientist Roadmap Branch
        phases_data = [
            ("Phase 1 — Build Your Foundation", "Month 1-2", "Develop strong programming and mathematical fundamentals.", "🐍 Python, 🗄 SQL, 📊 Stats, 📈 Prob, 🧮 Linear Algebra,  Git", "Student Performance Prediction"),
            ("Phase 2 — Machine Learning Core", "Month 3-4", "Master fundamental model architectures, training cycles, and mathematical regression.", "✔ NumPy & Pandas, ✔ Feature Engineering, ✔ Scikit-learn, ✔ Clustering", "House Price Prediction Engine"),
            ("Phase 3 — Become Industry Ready", "Month 5", "Implement advanced neural frameworks and deep analytics packages.", "Deep Learning, TensorFlow, Keras, NLP, Computer Vision, Power BI", "Medical Diagnosis Neural System"),
            ("Phase 4 — Professional Portfolio", "Month 6", "Consolidate real engineering artifacts to prepare for modern production deployment cycles.", "✔ 5 End-to-End Projects, ✔ GitHub Optimization, ✔ Kaggle Presence", "Production Model Deployment Framework"),
            ("Phase 5 — Certifications", "Recommended", "Google Data Analytics, AWS ML Specialty, Azure AI Engineer, IBM Data Science", "Value Addition", "Multi-Cloud Model Verification Endorsements"),
            ("Phase 6 — Industry Internship", "Target Firms", "Google, Microsoft, Amazon, OpenAI, NVIDIA, TCS, Infosys, Accenture", "Placement Goal", "Applied Core Machine Learning Engineering Group"),
            ("Phase 7 — Long-Term Career Goal", "Growth Track", "Junior Data Scientist  ➔  Data Scientist  ➔  Senior Researcher  ➔  AI Architect", "Milestone Vector", "Principal Executive Data Science Director")
        ]
        salary_timeline = [("Fresh Graduate", "₹6–10 LPA"), ("2 Years", "₹10–18 LPA"), ("5 Years", "₹20–35 LPA"), ("10 Years", "₹40–70 LPA")]

    # Render dynamic phases inside a robust table layout
    table_content = []
    for title, dur, desc, tech, proj in phases_data:
        p_cell = [
            Paragraph(f"<b>{title}</b>", ParagraphStyle('PT', parent=body_text, fontName='Helvetica-Bold', textColor=PREMIUM_NAVY)),
            Paragraph(f"<font color='{TEXT_MUTED.hexval()}'>{desc}</font>", body_text),
            Paragraph(f"<b>Skills:</b> {tech} | <b>Capstone:</b> <i>{proj}</i>", ParagraphStyle('PInf', parent=body_text, fontSize=8.5, textColor=RICH_GOLD))
        ]
        dur_cell = Paragraph(f"<font color='{PREMIUM_NAVY.hexval()}'><b>{dur}</b></font>", ParagraphStyle('PDur', parent=body_text, alignment=TA_CENTER))
        table_content.append([dur_cell, p_cell])

    blueprint_table = Table(table_content, colWidths=[90, 430])
    blueprint_table.setStyle(TableStyle([
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#E5D3B3")),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#F0E6D2")),
        ('BACKGROUND', (0, 0), (0, -1), LIGHT_GOLD_BG),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 8), ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 10), ('RIGHTPADDING', (0, 0), (-1, -1), 10)
    ]))
    story.append(blueprint_table)
    story.append(Spacer(1, 15))

    # Salary Progress Matrix Box
    sal_steps = [Paragraph(f"<b>{period}</b><br/><font color='{RICH_GOLD.hexval()}'>{val}</font>", ParagraphStyle('SalC', parent=body_text, alignment=TA_CENTER)) for period, val in salary_timeline]
    sal_row_table = Table([[sal_steps[0], Paragraph("➔", subtitle_style), sal_steps[1], Paragraph("➔", subtitle_style), sal_steps[2], Paragraph("➔", subtitle_style), sal_steps[3]]], colWidths=[110, 30, 110, 30, 110, 30, 100])
    sal_row_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#F4F7FA")), ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#D0DDF0")),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'), ('ALIGN', (0, 0), (-1, -1), 'CENTER')
    ]))
    story.append(Paragraph("<b>PROSPECTIVE COMPENSATION SCALING TIMELINE</b>", section_heading))
    story.append(sal_row_table)
    story.append(Spacer(1, 15))

    # Dual Column: Interactive Readiness Scores & Progress Metrics
    prog_table_data = [
        [Paragraph("Foundation", body_text), create_progress_bar(90, PREMIUM_NAVY)],
        [Paragraph("Machine Learning", body_text), create_progress_bar(82, PREMIUM_NAVY)],
        [Paragraph("Projects & Portfolios", body_text), create_progress_bar(75, PREMIUM_NAVY)],
        [Paragraph("Industry Certifications", body_text), create_progress_bar(100, PREMIUM_NAVY)],
        [Paragraph("Internship Placement", body_text), create_progress_bar(100, PREMIUM_NAVY)],
        [Paragraph("Career Readiness Score", body_text), create_progress_bar(100, RICH_GOLD)]
    ]
    prog_sub_table = Table(prog_table_data, colWidths=[120, 130])
    prog_sub_table.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'MIDDLE'), ('BOTTOMPADDING', (0, 0), (-1, -1), 4)]))

    readiness_data = [
        [Paragraph("Programming Skills", body_text), create_progress_bar(90, SUCCESS_GREEN), Paragraph("90%", body_text)],
        [Paragraph("Mathematics Base", body_text), create_progress_bar(85, SUCCESS_GREEN), Paragraph("85%", body_text)],
        [Paragraph("Applied ML Architectures", body_text), create_progress_bar(82, SUCCESS_GREEN), Paragraph("82%", body_text)],
        [Paragraph("Project Architecture", body_text), create_progress_bar(75, SUCCESS_GREEN), Paragraph("75%", body_text)],
        [Paragraph("Communication Vectors", body_text), create_progress_bar(70, SUCCESS_GREEN), Paragraph("70%", body_text)],
        [Paragraph("Interview Clearance Spec", body_text), create_progress_bar(72, SUCCESS_GREEN), Paragraph("72%", body_text)]
    ]
    readiness_sub_table = Table(readiness_data, colWidths=[120, 110, 30])
    readiness_sub_table.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'MIDDLE'), ('BOTTOMPADDING', (0, 0), (-1, -1), 4)]))

    metrics_layout_table = Table([
        [Paragraph("<b>ROADMAP PROGRESS STAGES</b>", section_heading), Paragraph("<b>EDUVISION READINESS SCORE</b>", section_heading)],
        [prog_sub_table, readiness_sub_table]
    ], colWidths=[260, 260])
    metrics_layout_table.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP'), ('BOTTOMPADDING', (0, 0), (-1, -1), 0)]))
    story.append(metrics_layout_table)
    story.append(Spacer(1, 15))

    # Tactical Strategy Recommendations Module
    recs = report_data.get("ai_recommendations", [
        "Complete at least 5 deployment-ready real-world capstone projects.",
        "Participate actively in Kaggle platform ecosystem challenges.",
        "Master Docker systems containerization and secure cloud-native deployment frameworks.",
        "Construct an optimized online enterprise personal portfolio network hub.",
        "Publish technical breakdowns or research articles to establish industry visibility."
    ])
    recs_paragraphs = [Paragraph(f"<font color='{RICH_GOLD.hexval()}'>&#x27A4;</font> {r}", list_item_style) for r in recs]
    recs_table = Table([[recs_paragraphs[:3], recs_paragraphs[3:]]], colWidths=[260, 260])
    recs_table.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP')]))
    
    story.append(Paragraph("<b>💡 EDUVISION AI STRATEGIC PATHWAY RECOMMENDATIONS</b>", section_heading))
    story.append(recs_table)
    story.append(Spacer(1, 15))

    # Structural Executive Bottom Data Bar
    bottom_kpis = [
        [Paragraph("<b>ESTIMATED COMPLETION</b><br/>🕒 6–8 Months", body_text), 
         Paragraph("<b>DIFFICULTY RATING</b>", body_text), create_star_rating(4),
         Paragraph("<b>MARKET PLACEMENT</b><br/>⚡ 92% Probability", body_text)],
        [Paragraph("<b>EXPECTED BASE PACKAGE</b><br/>₹6–12 LPA", body_text), 
         Paragraph("<b>INDUSTRY DEMAND</b>", body_text), create_star_rating(5),
         Paragraph("<b>PORTFOLIO STRENGTH</b><br/>Elite Tier", body_text)]
    ]
    bottom_kpi_table = Table(bottom_kpis, colWidths=[173, 115, 59, 173])
    bottom_kpi_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), LIGHT_GOLD_BG), ('BOX', (0, 0), (-1, -1), 1, RICH_GOLD),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'), ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('SPAN', (1, 0), (2, 0)), ('SPAN', (1, 1), (2, 1)),
        ('TOPPADDING', (0, 0), (-1, -1), 8), ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 12)
    ]))
    story.append(bottom_kpi_table)
    story.append(Spacer(1, 20))

    # --- BRAND CONTEXT BLOCK FOOTER ---
    story.append(HRFlowable(width="100%", thickness=1, color=RICH_GOLD, spaceAfter=8))
    story.append(Paragraph("<i>\"The best way to predict the future is to create it. Keep learning, keep growing.\"</i>", subtitle_style))
    story.append(Paragraph("<b>Verified and Dynamically Issued via EduVision Architectural Systems</b>", ParagraphStyle('EndB', parent=subtitle_style, textColor=PREMIUM_NAVY, fontName='Helvetica-Bold', fontSize=9, spaceBefore=4)))

    document.build(story, onFirstPage=draw_luxury_border, onLaterPages=draw_luxury_border)
    buffer.seek(0)
    return buffer