import { SuperAgentRequest } from 'superagent'
import { stubFor } from './wiremock'

export default {
  stubGetInterventions: (httpStatus = 200): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'GET',
        urlPattern: '/interventions.*',
      },
      response: {
        status: httpStatus,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        jsonBody: {
          content: [
            {
              id: 'ABC123',
              criminogenicNeeds: ['Thinking, Behaviours and Attitudes'],
              title: 'Horizon',
              description:
                'Horizon is for men convicted of a sexual or sexually-motivated offence who are medium risk or above. It helps address problematic factors and how they contribute to behaviour.',
              interventionType: 'ACP',
              setting: ['CUSTODY'],
              allowsMales: true,
              allowsFemales: false,
              minAge: null,
              maxAge: null,
              riskCriteria: ['Medium, high or very high', 'Yes'],
              attendanceType: ['In Person'],
              deliveryFormat: ['Group'],
            },
          ],
          totalElements: 9,
          totalPages: 2,
          size: 5,
          number: 0,
          numberOfElements: 5,
        },
      },
    }),
}
