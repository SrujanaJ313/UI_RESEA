import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import {
  TextField,
  FormControlLabel,
  Checkbox,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import client from "../../../helpers/Api";
import { additionalDetailsURL } from "../../../helpers/Urls";
import { DEFAULT_ADDITIONAL_DETAILS_FORM_DATA } from "../../../helpers/Constants";


function AppointmentDetails({ onCancel }) {
  const [formState, setFormState] = useState(DEFAULT_ADDITIONAL_DETAILS_FORM_DATA);
  const [interviewerNotes, setInterviewerNotes] = useState("");

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await client.get(additionalDetailsURL); // Replace with your API endpoint
        console.log('Response', response);
        const data = response.data;

        setFormState(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const addClaimantsReview = () => {
    setFormState((prevState) => ({
      ...prevState,
      claimantsReview: [...prevState.claimantsReview, {
        label: "Week ending 7/7/2024",
        value: "week3",
        isReviewed: false,
        isNoIssues: false,
        createdIssue: false,
        createdIssueType: "",
        createdSubIssue: ""
      }],
    }));
  }

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleIssueChange = (index, type, value) => {
    const updatedIssues = formState.createdIssues.map((issue, i) =>
      i === index ? { ...issue, [type]: value } : issue
    );
    setFormState((prevState) => ({
      ...prevState,
      createdIssues: updatedIssues,
    }));
  };

  const handleSubmit = () => {
    console.log('Form Data:', formState);
    // Send formState to the API endpoint if needed
    onCancel();
  };

  const addIssue = () => {
    setFormState((prevState) => ({
      ...prevState,
      createdIssues: [...prevState.createdIssues, { createdIssue: false, issueType: '', issueSub: '' }],
    }));
  };

  return (
    <Stack spacing={2}>

      <Typography className="label-text">
        Please check off each of the items listed below that you have completed in JMS
      </Typography>
      <Stack direction="row">
        <FormControlLabel
          control={<Checkbox sx={{ py: 0 }} checked={formState && !!formState['102']} onChange={handleCheckboxChange} name="102" />}
          label="102: Initial Assessment"
          sx={{ width: '33%' }}
        />
        <FormControlLabel
          control={<Checkbox sx={{ py: 0 }} checked={formState && !!formState['103']} onChange={handleCheckboxChange} name="103" />}
          label="106: ERI 1-on-1"
          sx={{ width: '33%' }}
        />
        <FormControlLabel
          control={<Checkbox sx={{ py: 0 }} checked={formState && !!formState['107']} onChange={handleCheckboxChange} name="107" />}
          label="107: ELMI Services"
          sx={{ width: '33%' }}
        />
      </Stack>
      <Stack direction="row" sx={{ marginTop: '0 !important' }}>
        <FormControlLabel
          control={<Checkbox sx={{ py: 0 }} checked={formState && !!formState['123']} onChange={handleCheckboxChange} name="123" />}
          label="123: Job Development"
          sx={{ width: '33%' }}
        />
        <FormControlLabel
          control={<Checkbox sx={{ py: 0 }} checked={formState && !!formState['153']} onChange={handleCheckboxChange} name="153" />}
          label="153: Case Management"
          sx={{ width: '33%' }}
        />
        <FormControlLabel
          control={<Checkbox sx={{ py: 0 }} checked={formState && !!formState['160']} onChange={handleCheckboxChange} name="160" />}
          label="160: Attended RESEA"
          sx={{ width: '33%' }}
        />
      </Stack>
      <Stack direction="row" sx={{ marginTop: '0 !important' }}>
        <Stack direction={'row'} width={'33%'} marginRight={'6px'}>
          <FormControlLabel
            control={<Checkbox sx={{ py: 0 }} checked={formState && !!formState['179']} onChange={handleCheckboxChange} name="179" />}
            label="179: Outside Web Referral (If Applicable)"
            sx={{ mr: 1 }}
          />
          <IconButton
            size="small"
            aria-label="close"
            sx={{ p: 0 }}
          >
            <EditIcon sx={{ width: 16, height: 16 }} />
          </IconButton>
        </Stack>

        <FormControlLabel
          control={<Checkbox sx={{ py: 0 }} checked={formState && !!formState['205']} onChange={handleCheckboxChange} name="205" />}
          label="205: Develop IEP"
          sx={{ width: '33%' }}
        />
        <FormControlLabel
          control={<Checkbox sx={{ py: 0 }} checked={formState && !!formState['209']} onChange={handleCheckboxChange} name="209" />}
          label="209: Refer to WIOA state & local training"
          sx={{ width: '33%' }}
        />
      </Stack>
      <Stack direction="row" sx={{ marginTop: '0 !important' }}>
        <Stack direction={'row'} width={'33%'} marginRight={'6px'}>
          <FormControlLabel
            control={<Checkbox sx={{ py: 0 }} checked={formState && !!formState['500']} onChange={handleCheckboxChange} name="500" />}
            label="500+: JMS Job Referral"
            sx={{ mr: 1 }}
          />
          <IconButton
            size="small"
            aria-label="close"
            sx={{ p: 0 }}
          >
            <EditIcon sx={{ width: 16, height: 16 }} />
          </IconButton>
        </Stack>
        <FormControlLabel
          control={<Checkbox sx={{ py: 0 }} checked={formState && !!formState['addSelf']} onChange={handleCheckboxChange} name="addSelf" />}
          label="Add Self as Case Manager"
          sx={{ width: '33%' }}
        />
        <FormControlLabel
          control={<Checkbox sx={{ py: 0 }} checked={formState && !!formState['jMSCaseNotes']} onChange={handleCheckboxChange} name="jMSCaseNotes" />}
          label="JMS Case Notes"
          sx={{ width: '33%' }}
        />
      </Stack>
      <Stack direction="row" sx={{ marginTop: '0 !important' }}>
        <FormControlLabel
          control={<Checkbox sx={{ py: 0 }} checked={formState && !!formState['jMSRegistrationComplete']} onChange={handleCheckboxChange} name="jMSRegistrationComplete" />}
          label="JMS Registration complete"
          sx={{ width: '33%', mr: 0 }}
        />
        <FormControlLabel
          control={<Checkbox sx={{ py: 0 }} checked={formState && !!formState['jMSRegistrationIncomplete']} onChange={handleCheckboxChange} name="jMSRegistrationIncomplete" />}
          label="JMS Registration Incomplete & Warning Issued"
          sx={{ ml: '5px' }}
        />
      </Stack>
      <Stack direction="row" sx={{ marginTop: '0 !important' }}>
        <Stack direction="row" sx={{ width: '33%' }}>
          <FormControlLabel
            control={<Checkbox sx={{ py: 0 }} checked={formState && !!formState['activeResume']} onChange={handleCheckboxChange} name="activeResume" />}
            label="Active Resume – Expiration Date:"
            sx={{ mr: 0 }}
          />
          <TextField variant="standard" size="small" name="activeResumeDate" value={formState && (formState.activeResumeDate || '')} onChange={handleInputChange} />
        </Stack>
        <Stack direction="row" >
          <FormControlLabel
            control={<Checkbox sx={{ py: 0 }} checked={formState && !!formState['activeRecruiter']} onChange={handleCheckboxChange} name="activeRecruiter" />}
            label="Active Virtual Recruiter– Expiration Date:"
            sx={{ ml: '-5px' }}
          />
          <TextField variant="standard" size="small" name="activeRecruiterDate" value={formState && (formState.activeRecruiterDate || '')} onChange={handleInputChange} />
        </Stack>
      </Stack>
      <Stack direction="row" sx={{ marginTop: '4px !important' }}>
        <FormControlLabel
          control={<Checkbox sx={{ py: 0 }} checked={formState && !!formState['wPACompleted']} onChange={handleCheckboxChange} name="wPACompleted" />}
          label="Wagner-Peyser Application Completed with Individual"
          sx={{ width: '33%' }}
        />
        <FormControlLabel
          control={<Checkbox sx={{ py: 0 }} checked={formState && !!formState['wPASignatureSent']} onChange={handleCheckboxChange} name="wPASignatureSent" />}
          label="Wagner-Peyser Application Signature sent"
          sx={{ width: '33%', ml:'-8px' }}
        />
        <FormControlLabel
          control={<Checkbox sx={{ py: 0 }} checked={formState && !!formState['sendIEP']} onChange={handleCheckboxChange} name="sendIEP" />}
          label="Send IEP for Signature and give copy"
          sx={{ width: '33%' }}
        />
      </Stack>

      <Typography className="label-text" marginTop={'8px !important'}>
        Please indicate the status of your review of the claimants work search:
      </Typography>
      <Stack >
        {formState && formState.claimantsReview && formState.claimantsReview.map((week) => (
          <Stack key={week.value} direction="row" alignItems="center" flex={1} spacing={2} sx={{ mb: 1 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={week.isReviwed}
                  name="isReviwed"
                  sx={{ py: 0 }}
                />
              }
              label={week.label}
            />
            <FormControl sx={{ width: 150 }} size="small">
              <InputLabel></InputLabel>
              <Select value={week.createdIssueType}>
                <MenuItem value="noIssues">No Issues</MenuItem>
                <MenuItem value="createIssue">Create Issue</MenuItem>
              </Select>
            </FormControl>
            <Typography px={1}>-</Typography>
            <FormControl sx={{ width: 150 }} size="small">
              <InputLabel></InputLabel>
              <Select value={week.createdSubIssue}>
                <MenuItem value="noIssues">No Issues</MenuItem>
                <MenuItem value="createIssue">Create Issue</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        ))}
        <Stack direction='row' justifyContent={'center'} sx={{ mt: '0px !important' }}>
          <Button variant="text" onClick={addClaimantsReview}>
            + Add more
          </Button>
        </Stack>
      </Stack>


      <Typography className="label-text" marginTop={'8px !important'}>
        Create issues, if any, based on the information you gathered during this interview:
      </Typography>
      <Stack spacing={2}>
        {formState && formState.createdIssues && formState.createdIssues.map((issue, index) => (
          <Stack key={index} direction="row" spacing={2} alignItems="center">
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!issue.createdIssue} onChange={(e) => handleIssueChange(index, 'createdIssue', e.target.value)} name="createdIssue"
                  sx={{ py: 0 }}
                />
              }
            />
            <FormControl variant="outlined" sx={{ minWidth: 200 }} size="small">
              <InputLabel>Issue Type</InputLabel>
              <Select
                value={issue.issueType}
                onChange={(e) => handleIssueChange(index, 'issueType', e.target.value)}
                label="Issue Type"
              >
                <MenuItem key={'type'} value={'Type 1'}>
                  Type 1
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" sx={{ minWidth: 200 }} size="small">
              <InputLabel>Issue Sub</InputLabel>
              <Select
                value={issue.issueSub}
                onChange={(e) => handleIssueChange(index, 'issueSub', e.target.value)}
                label="Issue Sub"
              >
                <MenuItem key={'sub'} value={'Sub 1'}>
                  Sub 1
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>
        ))}
        <Stack direction='row' justifyContent={'center'} sx={{ mt: '0px !important' }}>
          <Button variant="text" onClick={addIssue}>
            + Add more
          </Button>
        </Stack>
      </Stack>

      <Typography className="label-text" marginTop={'8px !important'}>Please indicate other actions taken:</Typography>
      <Stack direction={'row'} flexWrap={'wrap'} >
        <FormControlLabel
          control={<Checkbox sx={{ py: 0 }} checked={formState && !!formState['reviewdChapter']} onChange={handleCheckboxChange} name="reviewdChapter" />}
          label="Reviewed Chapters 1-4 of My Reemployment Plan"
        />
        <Stack direction="row" alignItems="center">
          <FormControlLabel
            control={<Checkbox sx={{ py: 0 }} checked={formState && !!formState['assginedChapters']} onChange={handleCheckboxChange} name="assginedChapters" />}
            label="Assigned chapters of My Reemployment Plan:"
          />
          <RadioGroup row value={formState && formState.chapter}>
            <FormControlLabel value="1-4" control={<Radio sx={{ py: 0 }} />} label="Chapter 1 to 4" />
            <FormControlLabel value="5-10" control={<Radio sx={{ py: 0 }} />} label="Chapters 5 to 10" />
          </RadioGroup>
        </Stack>
      </Stack>
      <Stack direction="row" >
        <FormControlLabel
          control={<Checkbox sx={{ py: 0 }} checked={formState && !!formState['physicallyVerified']} onChange={handleCheckboxChange} name="physicallyVerified" />}
          label="Physically verified claimant's ID"
        />
        <FormControlLabel
          control={<Checkbox sx={{ py: 0 }} />}
          label="Reminded Claimant to Self-schedule by:"
        />
        <TextField variant="standard" size="small" name="remindedClaiment" value={formState && (formState.remindedClaiment || '')} onChange={handleInputChange} />
      </Stack>

      <Stack direction="row" spacing={2}>
        <TextField
          size="small"
          label="Staff Notes, if any"
          value={formState && formState.interviewerNotes}
          onChange={(e) => setInterviewerNotes(e.target.value)}
          variant="outlined"
          multiline
          rows={2}
          fullWidth
        />
      </Stack>

      <FormControlLabel
        control={<Checkbox sx={{ py: 0 }} />}
        label="I confirm that I have provided all necessary Employment Services to this claimant"        
      />

      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
      </Stack>


    </Stack>
  );
}

export default AppointmentDetails;
