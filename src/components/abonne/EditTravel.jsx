import { forwardRef, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { handleAnimCoplete, preventClickBehaviour } from "../../utils/helper";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addTravel, getUserFeePass } from "../../utils/api/authAPIs";
import InputText from "../UI/InputText";
import Button from "../UI/Button";
import Spinner from "../UI/Spinner";
import EGoPassCard from "../agentRVA/EGoPassCard";

const coverVariants = {
    visible: {opacity: 1},
    hidden: {opacity: 0}
}

const bodyVariants = {
    visible: {y: 0, opacity: 1},
    hidden: {y: '-50%', opacity: 0}
}

export default forwardRef(function EditTravel({ closeModal, isModalOpen }, ref) {

    const formRef = useRef(null)
    const queryClient = useQueryClient()
    const mutateKey=['travels']
    const queryKey = ['passes']

    const { isLoading, data, error } = useQuery(queryKey, async () => await getUserFeePass())
    const pass = data || []
    const egopass = pass.filter(pass => pass.status === "ACTIVATED")

    const { isLoading: adding, mutate, reset } = useMutation(async (data) => await addTravel(data), {
        onSuccess: (travel) => {
            queryClient.setQueryData(mutateKey, (travels) => {
                travels.unshift(travel)
                return travels
            })
            closeModal()
            formRef.current.reset()
            reset()
        },
        onError: err => console.log(err)
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const travelData = { ...Object.fromEntries(formData) }
        if (travelData.passId) travelData.passId = parseInt(travelData.passId, 10)
        console.log(travelData)
        mutate(travelData)
    }

    return createPortal(<motion.div
        ref={ref}
        variants={coverVariants}
        animate={isModalOpen ? 'visible' : 'hidden'}
        onAnimationComplete={() => handleAnimCoplete(isModalOpen, ref)}
        className="modal modal_cover"
        tabIndex="-1"
        onClick={closeModal}
    >
        <motion.div
            variants={bodyVariants}
            animate={isModalOpen ? 'visible' : 'hidden'}
            className="modal-dialog modal_container"
            onClick={preventClickBehaviour}
        >
            <div className="modal-content h-100">
                <div className="modal-header">
                    <h5 className="modal-title">Scan du Qr-Code</h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={closeModal}
                    ></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit} ref={formRef}>
                        <InputText
                            containerClasses="mb-3"
                            id="flyType"
                            name="flyType"
                            label="Type de vol"
                            placeholder="Votre Type de vol"
                            required={true}
                        />
                        <InputText
                            containerClasses="mb-3"
                            id="nationality"
                            name="nationality"
                            label="Nationalité"
                            placeholder="Votre nationalité"
                            required={true}
                        />
                        <InputText
                            containerClasses="mb-3"
                            id="passeportNumber"
                            name="passeportNumber"
                            label="Numero de passport"
                            placeholder="Votre nom numero de passport"
                            required={true}
                        />
                        <InputText
                            containerClasses="mb-3"
                            id="flyCompany"
                            name="flyCompany"
                            label="Compagnie Aérienne"
                            placeholder="Votre compagnie Aérienne"
                            required={true}
                        />
                        <InputText
                            containerClasses="mb-3"
                            id="flyNumber"
                            name="flyNumber"
                            label="Numéro de vol"
                            placeholder="Votre numéro de vol"
                            required={true}
                        />
                        <InputText
                            containerClasses="mb-3"
                            id="provenance"
                            name="provenance"
                            label="Départ"
                            placeholder="Votre lieu de départ"
                            required={true}
                        />
                        <InputText
                            containerClasses="mb-3"
                            id="destination"
                            name="destination"
                            label="Destination"
                            placeholder="Votre destination"
                            required={true}
                        />
                        <InputText
                            containerClasses="mb-3"
                            id="phoneNumber"
                            name="phoneNumber"
                            label="Numéro de téléphone"
                            placeholder="Votre numéro de téléphone"
                            required={true}
                        />
                        <InputText
                            containerClasses="mb-3"
                            id="email"
                            name="email"
                            type="email"
                            label="Addresse mail"
                            placeholder="Votre addresse mail"
                            required={true}
                        />
                        <InputText
                            containerClasses="mb-3"
                            id="homeAddress"
                            name="homeAddress"
                            label="Adresse"
                            placeholder="Votre adresse"
                        />
                        {isLoading ? (
                            <Spinner />
                        ) : (
                            <select className="form-select mb-3 pass_selector" name="passId">
                                <option className="pass_selector" value={null}>Choisir un pass</option>
                                {egopass.map((pass, index) => <option
                                    key={`${pass.id}-${index}`}
                                    value={pass.id}
                                >
                                    <h4 className="text-secondary">Pass Gratuit</h4>
                                </option>)}
                            </select>
                        )}
                        <Button content="Créer le voyage" classList="mb-3" isLoading={adding} />
                    </form>
                </div>
            </div>
        </motion.div>
    </motion.div>, document.body)

})
