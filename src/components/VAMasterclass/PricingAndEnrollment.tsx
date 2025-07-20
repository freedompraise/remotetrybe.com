import { FC } from "react";
import { Check } from "lucide-react";
import { Cohort } from "../../utils/cohorts";
import { formatDate, formatDateRange } from "../../utils/dateUtils";

interface PricingAndEnrollmentProps {
    upcomingCohorts: Cohort[];
    selectedCohortId: string | undefined;
    selectedCohortDetails: Cohort | undefined;
    isRegistrationOpenForSelectedCohort: boolean | undefined;
    onCohortChange: (id: string) => void;
    onEnrollClick: () => void;
}

const PricingAndEnrollment: FC<PricingAndEnrollmentProps> = ({
    upcomingCohorts,
    selectedCohortId,
    selectedCohortDetails,
    isRegistrationOpenForSelectedCohort,
    onCohortChange,
    onEnrollClick
}) => {
    return (
        <section id="pricing" className="py-16 bg-cream">
            <div className="container mx-auto">
                <div className="text-center max-w-3xl mx-auto reveal">
                    <h2 className="section-title">Pricing & Enrollment</h2>
                    <p className="section-subtitle">
                        Choose the cohort that fits your schedule and start your journey.
                    </p>
                </div>

                <div className="max-w-md mx-auto mt-12">
                    {upcomingCohorts.length > 0 ? (
                        <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                            <div className="bg-primary text-white py-6 px-8">
                                <h3 className="text-2xl font-bold">Select Your Cohort</h3>
                            </div>

                            <div className="p-8">
                                <div className="mb-6">
                                    <label htmlFor="cohort-select" className="block text-sm font-medium text-gray-700 mb-2">Choose a Cohort:</label>
                                    <select
                                        id="cohort-select"
                                        value={selectedCohortId || ''}
                                        onChange={(e) => onCohortChange(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                    >
                                        {upcomingCohorts.map(cohort => (
                                            <option key={cohort.id} value={cohort.id}>
                                                {cohort.name} (Training: {formatDate(cohort.trainingStart)} - {formatDate(cohort.trainingEnd)})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {selectedCohortDetails && (
                                    <div className="space-y-4 mb-8">
                                        <div className="bg-gray-50 p-6 rounded-lg">
                                            {new Date() <= new Date(selectedCohortDetails.registrationEnd) ? (
                                                <h4 className="font-bold mb-2">Registration closes: {formatDate(selectedCohortDetails.registrationEnd)}</h4>
                                            ) : (
                                                <h4 className="font-bold mb-2 text-red-600">Registration closed. Training starts: {formatDate(selectedCohortDetails.trainingStart)}</h4>
                                            )}

                                            <p className="text-gray-600">
                                                Training dates: {formatDateRange(selectedCohortDetails.trainingStart, selectedCohortDetails.trainingEnd)}
                                            </p>
                                        </div>

                                        <ul className="space-y-4">
                                            <li className="flex items-start">
                                                <Check className="text-primary mr-2 mt-1 flex-shrink-0" size={18} />
                                                <span className="text-gray-700">Live interactive training sessions (Fri-Sun)</span>
                                            </li>
                                            <li className="flex items-start">
                                                <Check className="text-primary mr-2 mt-1 flex-shrink-0" size={18} />
                                                <span className="text-gray-700">Lifetime access to our community</span>
                                            </li>
                                        </ul>
                                    </div>
                                )}

                                {!selectedCohortDetails && upcomingCohorts.length > 0 && (
                                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
                                        <p className="font-bold">Please select a cohort</p>
                                        <p className="text-sm">Choose an upcoming cohort from the dropdown above to see details and enroll.</p>
                                    </div>
                                )}

                                <div className="flex justify-center mb-4">
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-primary">₦32,000</div>
                                        <div className="text-gray-500">or $35 USD</div>
                                    </div>
                                </div>

                                <p className="text-center text-sm text-yellow-700 bg-yellow-100 px-3 py-2 rounded mb-6">
                                    Non-Naira payments are only valid for the next available cohort.
                                </p>

                                <button
                                    className="btn-primary w-full text-lg py-4"
                                    onClick={onEnrollClick}
                                    disabled={!selectedCohortDetails || !isRegistrationOpenForSelectedCohort}
                                >
                                    {isRegistrationOpenForSelectedCohort ? "Enroll Now" : "Registration Closed"}
                                </button>

                                <p className="text-center text-sm text-gray-500 mt-4">
                                    Payment processed securely through Paystack
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="col-span-1 text-center">
                            <h4 className="text-xl font-bold text-gray-700">No upcoming cohorts scheduled at this time. Please check back later!</h4>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default PricingAndEnrollment; 