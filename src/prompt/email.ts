export const INSTRUCTION = `## Instructions for Generating an Email Note

An "email"-type note typically includes a subject, recipients, and optionally, sections or tasks necessary to compose an email.

Please note that the subject and recipients might not always be explicitly stated in the transcript. If they are not present, interpret the note as an email draft while clearly indicating missing details.

### Verbatim Email Notes

If the transcript explicitly indicates a verbatim description (e.g., phrases like "this is the text of the email I need to send" or "take this text down verbatim"), the note should contain the verbatim content clearly formatted into paragraphs and logical line breaks.

Corrections or restarts within verbatim dictations should be clearly documented. Include each distinct version under a dedicated subheading within the Body, as follows:

\`\`\`markdown
## Body

**Note:** This is a verbatim transcription with corrections/restarts:

### Version 1 (Discarded):
[Text...]

### Version 2 (Discarded):
[Text...]

### Final Accepted Version:
[Text...]
\`\`\`

This note is intended as a clear and structured starting point, though it might not be copied directly into an email client.

### Recipients

Recipients can be identified through explicit statements:

- **To:** e.g., "I need to send an email to Dennis about the Boat Race."
- **Cc:** e.g., "We also need to copy Dennis and Jerry on this email."
- **Bcc:** e.g., "I need to also blind copy Tony."

If recipients are not explicitly identified, clearly indicate this in the output:

\`\`\`markdown
To: *(Recipient not explicitly identified)*
\`\`\`

### Subject

The subject should be determined with the following priority:

1. Explicit statement by the speaker ("email about Boat Race").
2. Clearly identified topic mentioned by the speaker.
3. General context of the note if no explicit subject is mentioned.

If the subject is not explicitly stated, indicate this explicitly:

\`\`\`markdown
Subject: *(Subject not explicitly identified—suggested: "Boat Race")*
\`\`\`

### Tasks

Tasks are actionable items explicitly indicated in the transcript. Tasks typically involve verbs such as "send," "reply," "contact," or "follow-up." Tasks can also have classifications:

- **Urgent:** e.g., "We urgently need to finalize the schedule by tomorrow."
- **Overdue:** e.g., "I totally forgot to confirm attendance yesterday—this is overdue."

Summarize tasks in a bulleted list with appropriate classifications:

\`\`\`markdown
## Tasks
- [Urgent] Finalize event schedule by tomorrow.
- [Overdue] Confirm attendance with Dennis.
\`\`\`

### Sections

Sections represent thematically or sequentially grouped content identified in the transcript. Summarize clearly:

\`\`\`markdown
## Sections
- Event Planning
- Equipment Checklist
\`\`\`

### Body

The Body contains the main content of the email or notes related to email content.

- For verbatim dictation, explicitly note this, followed by formatted verbatim text.
- For non-verbatim content, provide a structured outline of email content.

Clearly indicate and format corrections or restarts if present.

Ensure the body captures as much original information from the transcript as possible.

## Markdown Formatting Guidelines

- Use \`##\` headers for Sections, Tasks, and Body.
- Use bullet points (\`-\`) for lists within Tasks and Sections.
- Bold important classifications or notes.

---

## Example Email Note

\`\`\`markdown
To: Dennis  
Cc: Jerry  
Bcc: Tony  
Subject: Boat Race  

## Sections
- Event Planning
- Equipment Checklist

## Tasks
- [Urgent] Confirm attendance with Dennis and Jerry by tomorrow.
- Check equipment availability.

## Body
This email should include details on event scheduling, equipment checklists, and special instructions for participants.

**Verbatim Dictation (Example):**  
"Dear Dennis,  
Please confirm your availability for the Boat Race scheduled for next Saturday. Jerry will also be joining us, and we need your confirmation urgently.  
Thanks,  
[Your Name]"
\`\`\`
`; 