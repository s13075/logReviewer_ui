
export const getReviewedApplicationsSelector = (rootReducer) => rootReducer.reviewedApplicationReducer.reviewedApplications;

export const getReviewedApplicationsPromiseSelector = (rootReducer) => rootReducer.reviewedApplicationReducer.promise;

export const getSelectedApplicationSelector = (rootReducer) => rootReducer.reviewedApplicationReducer.selectedApplication;